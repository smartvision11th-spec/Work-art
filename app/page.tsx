import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";

export default function Home() {
  const heroArtwork = artworks[0];
  const storyArtwork = artworks[1] || artworks[0];
  const customArtwork = artworks[2] || artworks[0];

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div className="sectionIntro">
            <p className="eyebrow">01 / SELECTED WORKS</p>

            <h2>
              Pieces with
              <br />
              <em>something to say.</em>
            </h2>
          </div>

          <Link
            href="/shop"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              borderBottom: "1px solid currentColor",
              paddingBottom: "6px",
              marginBottom: "12px",
            }}
          >
            View collection →
          </Link>
        </div>

        <p
          className="muted"
          style={{
            maxWidth: "560px",
            marginTop: "25px",
          }}
        >
          A selection of original works created by Dipali Singh, each with its
          own atmosphere, story, and character.
        </p>

        <div
          className="editorialWorks"
          style={{
            gap: "32px",
            marginTop: "65px",
          }}
        >
          {artworks[0] && (
            <Link
              href={`/artwork/${artworks[0].id}`}
              style={{ display: "block" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  background: "#e1d9d1",
                }}
              >
                <Image
                  src={artworks[0].image}
                  alt={artworks[0].title}
                  fill
                  sizes="(max-width: 700px) 100vw, 55vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.8s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  paddingTop: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "19px",
                    }}
                  >
                    {artworks[0].title}
                  </div>

                  <small className="muted">{artworks[0].category}</small>
                </div>

                <span style={{ fontSize: "11px" }}>
                  ₹{artworks[0].price.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              alignContent: "start",
              paddingTop: "90px",
            }}
          >
            {artworks.slice(1, 4).map((artwork) => (
              <Link
                key={artwork.id}
                href={`/artwork/${artwork.id}`}
                style={{ display: "block" }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "3 / 4",
                    overflow: "hidden",
                    background: "#e1d9d1",
                  }}
                >
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.8s ease",
                    }}
                  />
                </div>

                <div style={{ paddingTop: "10px" }}>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "15px",
                    }}
                  >
                    {artwork.title}
                  </div>

                  <small className="muted">{artwork.category}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "65px",
            paddingTop: "25px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <span className="muted" style={{ fontSize: "10px" }}>
            ORIGINAL WORKS · DIPALI SINGH
          </span>

          <Link className="button" href="/shop">
            Explore all artwork
          </Link>
        </div>
      </section>

      {/* ARTIST STORY */}
      <section
        style={{
          background: "var(--ivory-soft)",
          padding: "140px 5vw",
        }}
      >
        <div
          className="artistStoryGrid"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            gap: "8vw",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              maxWidth: "520px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Image
              src={storyArtwork.image}
              alt={storyArtwork.title}
              fill
              sizes="(max-width: 900px) 90vw, 35vw"
              style={{
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                right: "-24px",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                background: "var(--blush)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: "1.5",
              }}
            >
              Original
              <br />
              artwork
            </div>
          </div>

          <div>
            <p className="eyebrow">02 / THE ARTIST</p>

            <h2>
              Art begins
              <br />
              with a <em>feeling.</em>
            </h2>

            <p
              style={{
                maxWidth: "560px",
                color: "var(--muted)",
                lineHeight: "1.9",
                marginTop: "30px",
              }}
            >
              Dipali Singh creates original artwork with a focus on
              expression, atmosphere, and individuality.
            </p>

            <p
              style={{
                maxWidth: "560px",
                color: "var(--muted)",
                lineHeight: "1.9",
                marginTop: "18px",
              }}
            >
              Each piece is created to exist beyond the screen, becoming part
              of the room, memory, or story that surrounds it.
            </p>

            <div style={{ marginTop: "40px" }}>
              <Link className="button" href="/about">
                About Dipali Singh
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM ART */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "150px 5vw",
          background:
            "linear-gradient(135deg, #f4dddd 0%, #e8b8bd 45%, #d99aaa 100%)",
        }}
      >
        <div
          className="customArtGrid"
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            gap: "8vw",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <p className="eyebrow">03 / CUSTOM ARTWORK</p>

            <h2
              style={{
                fontSize: "clamp(58px, 8vw, 110px)",
                maxWidth: "850px",
                marginTop: "25px",
              }}
            >
              Your idea.
              <br />
              <em>Her art.</em>
            </h2>

            <p
              style={{
                maxWidth: "500px",
                lineHeight: "1.9",
                marginTop: "30px",
                color: "rgba(25,23,21,0.68)",
              }}
            >
              Have a personal idea, memory, portrait, or vision you want
              turned into artwork? Dipali creates custom pieces around your
              concept.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                flexWrap: "wrap",
                marginTop: "40px",
              }}
            >
              <Link
                className="button"
                href="/commission"
                style={{
                  background: "var(--charcoal)",
                  color: "var(--ivory)",
                  borderColor: "var(--charcoal)",
                }}
              >
                Create your artwork →
              </Link>

              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(25,23,21,0.58)",
                }}
              >
                Made personally by Dipali Singh
              </span>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "600px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "75%",
                height: "75%",
                top: "10%",
                right: "5%",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: "65%",
                aspectRatio: "4 / 5",
                top: "5%",
                right: "8%",
                transform: "rotate(4deg)",
                background: "var(--ivory-soft)",
                padding: "14px",
                boxShadow: "0 25px 70px rgba(72,39,44,0.16)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={customArtwork.image}
                  alt={customArtwork.title}
                  fill
                  sizes="(max-width: 900px) 65vw, 30vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "7%",
                left: "4%",
                width: "125px",
                height: "125px",
                borderRadius: "50%",
                background: "rgba(247,243,238,0.82)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "9px",
                letterSpacing: "0.1em",
                lineHeight: "1.5",
                textTransform: "uppercase",
              }}
            >
              Made
              <br />
              for you
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL STUDIO */}
      <section
        style={{
          padding: "130px 5vw 110px",
          background: "var(--ivory)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p className="eyebrow">04 / THE STUDIO</p>

              <h2>
                Follow the
                <br />
                <em>creative process.</em>
              </h2>
            </div>

            <p
              className="muted"
              style={{
                maxWidth: "420px",
                marginBottom: "10px",
              }}
            >
              New artwork, studio moments, and glimpses behind the work.
            </p>
          </div>

          <div
            className="socialGrid"
            style={{
              gap: "20px",
              marginTop: "60px",
            }}
          >
            <div
              style={{
                padding: "40px 30px",
                minHeight: "180px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "28px",
                }}
              >
                Instagram
              </span>

              <span
                className="muted"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Social link coming here →
              </span>
            </div>

            <div
              style={{
                padding: "40px 30px",
                minHeight: "180px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "28px",
                }}
              >
                WhatsApp
              </span>

              <Link
                href="/commission"
                className="muted"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Custom artwork enquiries →
              </Link>
            </div>

            <div
              style={{
                padding: "40px 30px",
                minHeight: "180px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "28px",
                }}
              >
                About
              </span>

              <Link
                href="/about"
                className="muted"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Meet Dipali Singh →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "45px 5vw",
          background: "var(--charcoal)",
          color: "var(--ivory)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "24px",
              }}
            >
              Dipali Singh
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#aaa39d",
              }}
            >
              Artist · Original artwork · Custom creations
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "25px",
              alignItems: "center",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <Link href="/shop">Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/commission">Custom Art</Link>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1440px",
            margin: "40px auto 0",
            paddingTop: "20px",
            borderTop: "1px solid rgba(247,243,238,0.15)",
            fontSize: "8px",
            letterSpacing: "0.1em",
            color: "#77716b",
          }}
        >
          © {new Date().getFullYear()} DIPALI SINGH · ALL RIGHTS RESERVED
        </div>
      </footer>
    </>
  );
}
