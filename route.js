const express = require("express");
const Contact = require("./models/contact"); 
const router = express.Router();

// POST: Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Retrieve all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a contact by ID
router.put("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate({_id:req.params.id}, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Remove a contact by ID
router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete({_id:req.params.id});
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
