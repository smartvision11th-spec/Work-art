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
            Art that
            <br />
            <em>feels personal.</em>
          </h1>

          <p className="heroText">
            Original paintings created with emotion, character, and a sense
            of place.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              marginTop: "8px",
            }}
          >
            <Link className="button" href="/shop">
              Explore artwork
            </Link>

            <Link
              href="/about"
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                borderBottom: "1px solid currentColor",
                paddingBottom: "5px",
              }}
            >
              Meet the artist
            </Link>
          </div>

          <p
            style={{
              marginTop: "70px",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Original works · Custom artwork · Worldwide
          </p>
        </div>

        <div className="heroArt">
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "28px",
              zIndex: 3,
              padding: "9px 12px",
              background: "rgba(247,243,238,0.82)",
              backdropFilter: "blur(10px)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Featured work
          </div>

          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 55vw"
          />

          <div
            style={{
              position: "absolute",
              bottom: "25px",
              left: "25px",
              right: "25px",
              zIndex: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "20px",
              color: "white",
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "22px",
                }}
              >
                {heroArtwork.title}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {heroArtwork.category}
              </div>
            </div>

            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
              }}
            >
              01 / 01
            </span>
          </div>
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
            atmosphere, and the details that make a piece feel personal.
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

      {/* ARTIST */}
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

      {/* CUSTOM ART */}
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

      {/* SOCIAL */}
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
