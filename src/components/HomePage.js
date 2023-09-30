import React, { Component } from "react";
import axios from "axios";
import "./HomePage.css";
import homeImage from "../images/anasayfa.png";

class SureCeviri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secilenSureId: "",
      ceviri: "",
      sureler: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/sures")
      .then((response) => {
        this.setState({ sureler: response.data });
      })
      .catch((error) => {
        console.error("Sureleri getirirken hata oluştu:", error);
      });
  }

  handleSureSecimi = (event) => {
    const sureId = parseInt(event.target.value, 10);

    const secilenSure = this.state.sureler.find(
      (sure) => sure.sureId === sureId
    );

    this.setState({
      secilenSureId: sureId,
      sure: secilenSure ? secilenSure.sure : "",
      ceviri: secilenSure ? secilenSure.ceviri : "",
      ayetSayısı: secilenSure ? secilenSure.ayetSayısı : "",
    });
  };

  render() {
    const turkmenceLink = `/turkmence/${this.state.secilenSureId}`;
    const arapcaLink = "/arapca";

    // secilenSureId boşsa ayet sayısı labelını ve radio inputlarını gösterme
    const showAyetSayisiAndRadio = !!this.state.secilenSureId;

    return (
      <div className="page">
        <div className="navbar">
          <a href="/">
            <button className="ana-sayfa-button">Ana Sayfa</button>
          </a>
          <label className="sure-label">Sure</label>
          <select
            onChange={this.handleSureSecimi}
            value={this.state.secilenSureId}
          >
            <option value="">Seçiniz</option>
            {this.state.sureler.map((sure) => (
              <option key={sure.sureId} value={sure.sureId}>
                {sure.sureAd}
              </option>
            ))}
          </select>

          {/* Ayet sayısı labelını ve radio inputlarını, showAyetSayisiAndRadio true ise göster */}
          {showAyetSayisiAndRadio && (
            <>
              <label className="ayet-sayısı-label">Ayet Sayısı</label>
              <div className="ayet-sayısı">{this.state.ayetSayısı}</div>

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
                  onClick={() => {
                    window.location.href = arapcaLink;
                  }}
                />
                <label for="html">Arapca</label>
              </div>
            </>
          )}
        </div>

        <div className="box-container">
          <div className="box-style">{this.state.sure}</div>
          <div className="box-style">{this.state.ceviri}</div>
        </div>
      </div>
    );
  }
}

export default SureCeviri;
