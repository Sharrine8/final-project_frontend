// import img from "../../assets/search_background.png";
import img from "../../assets/author.jpeg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <img className="about__img" src={img} />
      <div className="about__info">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Lorem ipsum dolor sit amet. Cum voluptas ipsa est ullam deleniti id
          beatae autem qui dolorem architecto qui consequatur repellat? Sed
          voluptas galisum et rerum accusantium ut officia dolorum ad provident
          quas. Ut reiciendis illum id tempore libero sit vero dolores est ipsa
          ipsum. Est delectus rerum est voluptatem eaque et officia dolor aut
          dolorum excepturi. Eos molestiae nesciunt et omnis veritatis quo
          consectetur impedit et temporibus dolorem eos iure quia ut voluptas
          autem in maiores autem. Qui molestias veniam id ullam debitis in sunt
          possimus ut rerum enim aut nihil voluptatem eum suscipit galisum?
        </p>
      </div>
    </section>
  );
}

export default About;
