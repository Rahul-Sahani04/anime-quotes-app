const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;

const dotenv = require("dotenv"); // Import dotenv
dotenv.config(); // Load environment variables from .env file

// Add middleware and routes here
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert data from CSV into the database (Supabase)
async function insertData() {
  try {
    const data = []; // Collect data to insert
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push({
          quote: row.quote,
          character_name: row.character_name,
          anime_name: row.anime_name,
        });
      })
      .on("end", async () => {
        const { data, error } = await supabase
          .from("anime_quotes")
          .upsert(data);

        if (error) {
          console.error("Error inserting data:", error);
        } else {
          console.log("Data inserted successfully.");
        }
      });
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

// Function to insert data from CSV into the database (Supabase)
async function insertCharacterData() {
  try {
    const data = []; // Collect data to insert
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push({
          anime_name: row.anime_name,
          char_name: row.char_name,
          image_urls: row.image_urls.split(" "),
        });
      })
      .on("end", async () => {
        const { data, error } = await supabase
          .from("characters-data")
          .upsert(data);

        if (error) {
          console.error("Error inserting data:", error);
        } else {
          console.log("Data inserted successfully.");
        }
      });
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

// Function to fetch random quotes (Supabase)
app.get("/random-quote", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("anime_quotes")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error fetching random data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (data.length > 0) {
        const randomQuote = data[0]; // Extract the first item from the array
        res.json({ quote: randomQuote, imgUrl: "" });
      } else {
        res.json({ quote: null, imgUrl: "" }); // Handle the case when no data is returned
      }
    }
  } catch (error) {
    console.error("Error fetching random data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
