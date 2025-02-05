import React, { Component } from "react";
import loadingImage from "../public/dog_bed.jpg";
import badImage from "../public/nik.jpg";
import { get } from "../utilities";
import "./DogViewer.css";

class DogViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: "",
      loading: true,
    };
  }

  fetchDog = async () => {
    const { breed } = this.props;

    let link;
    try {
      const response = await get(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      link = response.message;
    } catch {
      link = badImage;
    }

    this.setState({
      imageLink: link,
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchDog();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.breed !== this.props.breed ||
      prevProps.iteration != this.props.iteration
    ) {
      this.setState({
        loading: true,
      });
      this.fetchDog();
    }
  }

  render() {
    const { imageLink, loading } = this.state;
    return (
      <div className="DogViewer-wrapper">
        <img
          className="DogViewer-img"
          src={loading ? loadingImage : imageLink}
        />
      </div>
    );
  }
}

export default DogViewer;
