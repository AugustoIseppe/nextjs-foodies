import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //Simular um erro 
    //throw new Error('Unable to fetch meals'); -> erri simulado
    const meals = db.prepare("SELECT * FROM meals").all();
    return meals;
}

export function getMealBySlug(slug) {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
} 

export async function saveMeal (meal) {
    meal.slug = slugify(meal.title, { lower: true }); // slugify -> transforma o titulo em uma string mais amigavel para urls e protege contra sql injection
    meal.instructions = xss(meal.instructions); // xss -> protege contra ataques de cross-site scripting

    //1. Tratando das imagens -> pegar a extensão da imagem
    const extension = meal.image.name.split('.').pop();
    //2. Criar um nome unico para a imagem
    const fileName = `${meal.slug}.${extension}`; 

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES
        (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);

}