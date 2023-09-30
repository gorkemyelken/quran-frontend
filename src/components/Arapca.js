import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Turkmence() {
  let { sureId } = useParams();
  const [sure, setSure] = useState({});
  const [sures, setSures] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sures/${sureId}`)
      .then((response) => {
        setSure(response.data);
      })
      .catch((error) => {
        console.error("Sure çekme hatası:", error);
      });
  }, [sureId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sures`)
      .then((response) => {
        setSures(response.data);
      })
      .catch((error) => {
        console.error("Sure çekme hatası:", error);
      });
  }, []);

  const turkmenceLink = `/turkmence/${sure.sureId}`;
  const arapcaLink = "/arapca";

  const handleSureSecimi = (event) => {
    const selectedSure = event.target.value;

    window.location.href = `/arapca/${selectedSure}`;
  };

  return (
    <div className="page">
      <div className="navbar">
      <a href="/">
            <button className="ana-sayfa-button">Ana Sayfa</button>
          </a>
        <label className="sure-label">Sure</label>
        <select onChange={handleSureSecimi} value={sure.sureId}>
          {sures.map((sure) => (
            <option key={sure.sureId} value={sure.sureId}>
              {sure.sureAd}
            </option>
          ))}
        </select>
        <label className="ayet-sayısı-label">Ayet Sayısı</label>
        <div className="ayet-sayısı">{sure.ayetSayısı}</div>

        <div className="languages">
          <input
            type="radio"
            id="turkmence"
            name="language"
            value="turkmence"
        
            onClick={() => {
              window.location.href = turkmenceLink;
            }}
          />
          <label for="html">Türkmence</label>
          <input
            type="radio"
            id="arapca"
            name="language"
            value="arapca"
            checked
            onClick={() => {
              window.location.href = arapcaLink;
            }}
          />
          <label for="html">Arapca</label>
        </div>
      </div>

      <div className="box-container">
        <div className="box-style">{sure.ceviri}</div>
      </div>
    </div>
  );
}
