import express from 'express';

// Start the server
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Get request for all menu items
app.get('/menu', (req, res) => { 
    res.send(menu);
});

// Post new menu item
app.post('/menu', (req, res) => { 
    const newMenuItem = req.body;

    if(newMenuItem) {
        menu.push(newMenuItem)
        res.status(201).json(newMenuItem);
    } else {
        res.status(400).send('New menu item could not be created')
    }
});

// Remove menu item
app.delete('/menu/:id', (req, res) => {
  const id = req.params.id;
  const deleteMenuItem = menu.splice(id, 1);
  res.status(200).json(deleteMenuItem)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Menu data
const menu = [
    {
      "id":1,
      "title":"Bryggkaffe",
      "desc":"Bryggd på månadens bönor.",
      "price":39
    },
    {
      "id":2,
      "title":"Caffè Doppio",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":3,
      "title":"Cappuccino",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":4,
      "title":"Latte Macchiato",
      "desc":"Bryggd på månadens bönor.",
      "price":49
    },
    {
      "id":5,
      "title":"Kaffe Latte",
      "desc":"Bryggd på månadens bönor.",
      "price":54
    },
    {
      "id":6,
      "title":"Cortado",
      "desc":"Bryggd på månadens bönor.",
      "price":39
    }
  ]