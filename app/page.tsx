import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";

export default function Home() {
  const heroArtwork = artworks[0];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">ARTIST · DIPALI SINGH</p>

          <h1>
            Art that makes
            <br />
            <em>space feel alive.</em>
          </h1>

          <p className="heroText">
            Explore original artwork by Dipali Singh, created to bring
            character, emotion, and individuality into your space.
          </p>

          <Link className="button" href="/shop">
            Explore artwork
          </Link>
        </div>

        <div className="heroArt">
          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 55vw"
          />
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="section">
        <div className="sectionIntro">
          <p className="eyebrow">SELECTED WORKS</p>

          <h2>
            A collection of
            <br />
            <em>original pieces.</em>
          </h2>

          <p className="muted">
            Discover paintings created with an emphasis on expression,
            atmosphere, and the small details that make a piece feel personal.
          </p>
        </div>

        <div className="grid">
          {artworks.slice(0, 4).map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>

        <div style={{ marginTop: "45px" }}>
          <Link className="button" href="/shop">
            View full collection
          </Link>
        </div>
      </section>

      {/* ARTIST / STORY */}
      <section className="dark">
        <p className="eyebrow">THE ARTIST</p>

        <h2>
          Art is not just
          <br />
          something to <em>look at.</em>
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: "520px",
            marginTop: "30px",
          }}
        >
          Every artwork carries a mood, a memory, or an idea. Dipali Singh
          creates pieces that are meant to become part of the spaces and
          stories they enter.
        </p>

        <div style={{ marginTop: "40px" }}>
          <Link
            className="button"
            href="/about"
            style={{
              background: "transparent",
              color: "inherit",
              borderColor: "rgba(247,243,238,0.35)",
            }}
          >
            Meet the artist
          </Link>
        </div>
      </section>

      {/* CUSTOM ARTWORK */}
      <section className="section pinkSection">
        <p className="eyebrow">MADE FOR YOU</p>

        <h2>
          Your idea,
          <br />
          <em>turned into art.</em>
        </h2>

        <p
          className="muted"
          style={{
            maxWidth: "520px",
            marginTop: "25px",
          }}
        >
          Have something personal in mind? Dipali also creates custom
          artworks made around your idea, space, or story.
        </p>

        <div style={{ marginTop: "35px" }}>
          <Link className="button" href="/commission">
            Create your artwork →
          </Link>
        </div>
      </section>

      {/* SOCIAL / FINAL CTA */}
      <section className="section">
        <p className="eyebrow">FOLLOW THE ART</p>

        <h2>
          From the studio
          <br />
          <em>to your space.</em>
        </h2>

        <p className="muted" style={{ maxWidth: "520px" }}>
          Follow Dipali Singh on social media to discover new artwork,
          studio moments, and upcoming pieces.
        </p>

        <div style={{ marginTop: "35px" }}>
          <Link className="button" href="/about">
            Discover more
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "35px 5vw",
          borderTop: "1px solid rgba(25,23,21,0.1)",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span>ARTIST DIPALI SINGH</span>
        <span>Original artwork · Custom creations</span>
      </footer>
    </>
  );
}
