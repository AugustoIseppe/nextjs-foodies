import Image from 'next/image';
import { notFound } from 'next/navigation';

import classes from './page.module.css';
import { getMealBySlug } from '@/lib/meals';

export default function MealDeatails({ params }) {

    //o params.mealSlug é o mesmo que o [mealSlug] do arquivo de rota para poder fazer a busca no banco de dados
    const meal = getMealBySlug(params.mealSlug);

    if (!meal) {
        // Se não encontrar a refeição, redireciona para a página de erro 404 mais próxima
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>

                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        By <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>

            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions || "",
                    }}
                ></p>
            </main>

        </>
    );
}