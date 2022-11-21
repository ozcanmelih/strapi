import axios from "axios";
import { useEffect, useState } from "react";
import Player from "./Player";

const Index = () => {
  const [songs, setSongs] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  // fetching our api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          // "http://localhost:1337/api/songs?populate[media][populate]=*&populate[artist][populate]=name&populate[featurings][populate]=name"
          "http://localhost:1337/api/music-player?populate[songs][populate][0]=artist&populate[songs][populate][1]=featurings&populate[songs][populate][2]=media.cover&populate[songs][populate][3]=media.src"
        );
        // let _musics = response.data;
        let _musics = response.data.attributes.songs.data;
        _musics.map((music) => {
          let pload = {
            title: music.attributes.title,
            artist: music.attributes.artist.data.attributes,
            featurings: music.attributes.featurings.data,
            img_src:
              "http://localhost:1337" +
              music.attributes.media.cover.data[0].attributes.url,
            src:
              "http://localhost:1337" +
              music.attributes.media.src.data[0].attributes.url,
          };
          setSongs((oldSongs) => [...oldSongs, pload]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // .. calling
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs]);
  // ..
  return (
    <div className="App">
      {songs.length > 0 && (
        <>
          <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            songs={songs}
          />
        </>
      )}
    </div>
  );
};

export default Index;
