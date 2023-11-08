import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ContactButton } from "./component/ContactButton";
import "./App.css";
import ScreenshotButton from "./component/ScreenshotButton";

function App() {
  const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } = process.env;
  const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);
  const [quotes, setQuotes] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [FontFamily, setFontFamily] = useState("");
  const [loading, setLoading] = useState(true);

  const currentFonts = [
    "'Mukta', sans-serif",
    "'Oswald', sans-serif",
    "'Playpen Sans', cursive",
    "'Poppins', sans-serif",
  ];

  const removeLeadingSpace = (str) => (str.charAt(0) === " " ? str.slice(1) : str);

  async function fetchChar(char_name, anime_name) {
    try {
      char_name = removeLeadingSpace(char_name);
      anime_name = removeLeadingSpace(anime_name);

      const { data, error } = await supabase
        .from("character_data")
        .select("*")
        .eq("char_name", char_name)
        // .eq("anime_name", anime_name);
      
      if (char_name !== data[0].char_name) {
        setImgUrl("")
        return 0;
      }

      if (error) {
        throw new Error("Network response was not ok");
      }
      const headers = ["image_url1","image_url2","image_url3","image_url4"]

      const gotImg = data[0]["image_url1"]

      setImgUrl(gotImg);
    } catch (error) {
      setImgUrl("")
      console.error("Error fetching character data: ", error);
      
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("anime_quotes").select("*");

      if (error) {
        throw new Error("Network response was not ok");
      }

      const gotQuote = data[Math.floor(Math.random() * data.length)];
      setQuotes(gotQuote);
      console.log("Q", quotes)
      await fetchChar(gotQuote.character_name, gotQuote.anime_name);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    setFontFamily(currentFonts[Math.floor(Math.random() * currentFonts.length)]);
  }, []);

  const ContactList = [
    {
      color: "#02040A",
      username: "@Rahul-Sahani-04",
      logo: "https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png",
      url: "https://github.com/Rahul-Sahani04/",
    },
    {
      color: "#FF0002",
      username: "@SheMadeMeAPoetry",
      logo: "https://png.pngtree.com/png-clipart/20230401/original/pngtree-three-dimensional-instagram-icon-png-image_9015419.png",
      url: "https://www.instagram.com/shemademeapoetry/",
    },
    {
      color: "#1578B6",
      username: "Rahul Sahani",
      logo: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
      url: "https://www.linkedin.com/in/rahul-sahani-472201237/",
    },
  ];

  return (
    <div className="App">
      <div className="flex justify-evenly items-center xl:w-1/6 lg:w-1/6 md:w-2/6 sm:w-2/6 w-3/6 top-left-icons absolute top-4 right-10">
        {ContactList.map((item) => (
          <ContactButton
            key={item.username}
            color={item.color}
            username={item.username}
            logo={item.logo}
            url={item.url}
          />
        ))}
        
      </div>
      <div className="flex justify-center items-center w-screen h-screen">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="mockup-window border bg-base-300 w-3/4 relative " id="divToCapture">
            <div className="flex justify-center px-4 py-16 items-center align-middle bg-base-200 h-full xl:text-2xl lg:text-2xl md:text-xl sm:text-lg quoteText">
              <p
                style={{
                  width: "80%",
                  fontFamily: FontFamily,
                }}
              >
                {quotes.quote}
              </p>
            </div>
            <ScreenshotButton/>
            <div className="w-full text-right absolute bottom-6 right-24 font-sans text-sm font-bold sm:text-sm xl:text-xl lg:text-lg md:text-base">
              {quotes.anime_name}
            </div>
            <div className="w-full text-right absolute bottom-2 right-24 text-sm sm:text-sm xl:text-xl lg:text-lg md:text-base">
              {quotes.character_name}
            </div>
            <div className="w-[60px] h-[60px] absolute bottom-2 right-2 rounded-full overflow-clip">
              <img
                src={imgUrl !== "" ? imgUrl : "https://placehold.co/600x400"}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                alt="Character Image"
              />

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
