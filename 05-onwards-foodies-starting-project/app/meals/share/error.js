'use client';

// O erro só será tratado quando estiver no mesmo local que a função getMeals, ou seja, no arquivo lib/meals.js.
export default function Error ({error}) {
    return (
        <main className="error">
            <h1>An error ocurred!</h1>
            <p>Failed to create meal!</p>
        </main>
    );
}