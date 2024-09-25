'use server';

//Import para redirecionar o usuario para outra pagina
import { redirect } from 'next/navigation';

import { saveMeal } from "./meals";
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) { 
    return { message: 'Invalid input. Please check your data.' };
  }
    await saveMeal(meal);
    revalidatePath('/meals');// Informa o Next.js que a pagina precisa ser atualizada e revalidar o cache
    // revalidatePath('/', 'layout');// Informa o Next.js que a pagina precisa ser atualizada e revalidar o cache (revalida todas as paginas que usam o layout) 
    redirect('/meals'); //Redireciona o usuario para a pagina de refeições
  }