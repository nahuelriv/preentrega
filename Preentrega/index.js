const args = process.argv.slice(2);
const [method, route, ...productData] = args;

async function app() {
    if (!method || !route) {
        console.log("Faltan argumentos. Por favor, ingresa un método (GET, POST, DELETE) y una ruta.");
        return;
    }

    switch (method.toUpperCase()) {
        case 'GET':
            try {
                const response = await fetch(`https://fakestoreapi.com/${route}`);
                const data = await response.json();
                console.log("Resultados:");
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
            break;

        case 'POST':
            const [title, price, category] = productData;
            
            if (!title || !price || !category) {
                console.log("Faltan datos para el producto. Ingresa: título, precio y categoría.");
                return;
            }

            try {
                const newProduct = { title, price: Number(price), category };

                const response = await fetch(`https://fakestoreapi.com/${route}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...newProduct })
                });
                const data = await response.json();
                console.log("Producto creado:");
                console.log(data);
            } catch (error) {
                console.error("Error al crear el producto:", error);
            }
            break;

        case 'DELETE':
            console.log(`Eliminando registro en la ruta: ${route}...`);
            try {
                const response = await fetch(`https://fakestoreapi.com/${route}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                console.log("Producto eliminado:");
                console.log(data);
            } catch (error) {
                console.error("Error", error);
            }
            break;

        default:
            console.log("Método no reconocido.");
    }
}

app();