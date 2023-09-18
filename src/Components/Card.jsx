import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Card({ id }) {
  const [prayer, setPrayer] = useState({}); // Store Prayer Times
  const [isLoading, setLoading] = useState(true); // Loading API State
  const [timeOfDay, setTimeOfDay] = useState("");
  const [mainAdzan, setMainAdzan] = useState("");
  const [mainTime, setMainTime] = useState("");

  const d = new Date();

  const day = d.toLocaleString("id-ID", { day: "2-digit" });
  const month = d.toLocaleString("id-ID", { month: "2-digit" });
  const year = d.toLocaleString("id-ID", { year: "numeric" });

  const hour = d.getHours();
  const minutes = d.getMinutes();
  const time = `${hour}:${minutes}`;

  const styleAdzan = { fontSize: 20, fontFamily: "Roboto" };
  const styleTime = { fontSize: 15, fontFamily: "Roboto" };

  /*
   * Load Adzan API
   */
  useEffect(() => {
    axios
      .get(
        `https://api.myquran.com/v1/sholat/jadwal/${id}/${year}/${month}/${day}`
      )
      .then((result) => {
        setPrayer(result.data);
        setLoading(false);
        /*
         * For Main Card (Image and which Adzan based on Time)
         */
        if (result.data) {
          if (time > "23:00" && time <= "06:00") {
            setTimeOfDay("Dawn");
            setMainAdzan("Subuh");
            setMainTime(result.data.data.jadwal.subuh);
          } else if (time > "06:00" && time <= "16:00") {
            setTimeOfDay("Noon");
            if (time > "06:00" && time <= "13.30") {
              setMainAdzan("Dzuhur");
              setMainTime(result.data.data.jadwal.dzuhur);
            } else {
              setMainAdzan("Ashar");
              setMainTime(result.data.data.jadwal.ashar);
            }
          } else if (time > "16:00" && time <= "18:30") {
            setTimeOfDay("Dusk");
            setMainAdzan("Maghrib");
            setMainTime(result.data.data.jadwal.maghrib);
          } else if (time > "18:30" && time <= "23:00") {
            setTimeOfDay("Night");
            setMainAdzan("Isya");
            setMainTime(result.data.data.jadwal.isya);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <CircularProgress color="success" />;
  }

  return (
    <div className="cardm">
      <div className="card">
        <svg
          className="adzanNow"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999Xlink"
          x="0px"
          y="0px"
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
          xmlSpace="preserve"
        >
          <image
            className="adzanNow"
            id="image0"
            width="100"
            height="100"
            x="0"
            y="0"
            href={`src/img/${timeOfDay}.png`}
          ></image>
        </svg>
        <div className="main">
          <Typography
            variant="h2"
            sx={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#001e1d",
              fontFamily: "Roboto",
            }}
          >
            {mainAdzan}
          </Typography>
        </div>
        <div className="mainsub">
          <Typography variant="subtitle" sx={styleAdzan}>
            {mainTime}
          </Typography>
        </div>
      </div>

      <div className="card2">
        <div className="upper">
          <div className="subuh">
            <div className="subuhtext">
              <Typography variant="subtitle" sx={styleAdzan}>
                Subuh
              </Typography>
              <br />
              <Typography variant="subtitle" sx={styleTime}>
                {prayer.data.jadwal.subuh}
              </Typography>
            </div>
          </div>

          <div className="dzuhur">
            <div className="dzuhurtext">
              <Typography variant="subtitle" sx={styleAdzan}>
                Dzuhur
              </Typography>
              <br />
              <Typography variant="subtitle" sx={styleTime}>
                {prayer.data.jadwal.dzuhur}
              </Typography>
            </div>
          </div>
        </div>

        <div className="lower">
          <div className="ashar">
            <div className="ashartext">
              <Typography variant="subtitle" sx={styleAdzan}>
                Ashar
              </Typography>
              <br />
              <Typography variant="subtitle" sx={styleTime}>
                {prayer.data.jadwal.ashar}
              </Typography>
            </div>
          </div>

          <div className="maghrib">
            <div className="maghribtext">
              <Typography variant="subtitle" sx={styleAdzan}>
                Maghrib
              </Typography>
              <br />
              <Typography variant="subtitle" sx={styleTime}>
                {prayer.data.jadwal.maghrib}
              </Typography>
            </div>
          </div>

          <div className="isya">
            <div className="isyatext">
              <Typography variant="subtitle" sx={styleAdzan}>
                Isya
              </Typography>
              <br />
              <Typography variant="subtitle" sx={styleTime}>
                {prayer.data.jadwal.isya}
              </Typography>
            </div>
          </div>
          <div className="card3">حَيَّ عَلَى الْفَلاَحِ</div>
        </div>
      </div>
    </div>
  );
}
