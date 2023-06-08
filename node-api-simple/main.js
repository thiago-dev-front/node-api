const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();



app.use(bodyParser.json());

let products = [
    { id: 1, name: 'Produto 1' },
    { id: 2, name: 'Produto 2' },
    { id: 3, name: 'Produto 3' },
];

// Rota para obter todos os produtos
app.get('/products', (request, response) => {
    // Aqui você pode implementar a lógica para buscar os produtos no banco de dados ou qualquer outra fonte de dados
    let _products = products
    response.json(_products);
});

// Rota para criar um novo produto
app.post('/products', (request, response) => {
    const {id, name } = request.body;

    // Aqui você pode implementar a lógica para criar um novo produto no banco de dados ou qualquer outra fonte de dados
    const newProduct = { id: id, name };

    products.push(newProduct)
    response.json(newProduct);
});


app.put('/products/:id', (request, response) => {
    const { name } = request.body;
    const { id } = request.params;
    
    const product = products.find(p => p.id === parseInt(id))
    
    product.name = name;

    response.json(product);
  });

  app.delete('/products/:id', (request, response) => {
    const { id } = request.params;

    products = products.filter(product => product.id !== parseInt(id))
    console.log(products)
    response.json(true);
  });



app.listen(port , () => {
    console.log(`Serviço de produtos iniciado na porta ${port}`);
})
