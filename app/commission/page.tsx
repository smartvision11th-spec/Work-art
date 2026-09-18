import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";

export default function CommissionPage() {
  const featuredArtwork = artworks[0];

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          minHeight: "calc(100vh - 78px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "7vw",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "80px 5vw",
        }}
      >
        <div>
          <p className="eyebrow">CUSTOM ARTWORK · DIPALI SINGH</p>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(58px, 8vw, 110px)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              margin: "25px 0",
            }}
          >
            Your idea.
            <br />
            <em>Her art.</em>
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: "520px",
              lineHeight: 1.9,
              marginTop: "30px",
            }}
          >
            Turn a personal idea, memory, portrait, or vision into an
            original artwork created especially for you by Dipali Singh.
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
            <a
              href="#contact"
              className="button"
            >
              Start your artwork →
            </a>

            <Link
              href="/shop"
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                borderBottom: "1px solid currentColor",
                paddingBottom: "5px",
              }}
            >
              View original works
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          style={{
            position: "relative",
            minHeight: "650px",
            background:
              "linear-gradient(135deg, #f4dddd, #e8b8bd 50%, #d99aaa)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              top: "10%",
              right: "8%",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "62%",
              aspectRatio: "4 / 5",
              top: "9%",
              right: "13%",
              background: "var(--ivory-soft)",
              padding: "14px",
              transform: "rotate(4deg)",
              boxShadow: "0 30px 80px rgba(72,39,44,0.18)",
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
                src={featuredArtwork.image}
                alt={featuredArtwork.title}
                fill
                sizes="(max-width: 900px) 80vw, 35vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: "8%",
              width: "125px",
              height: "125px",
              borderRadius: "50%",
              background: "rgba(247,243,238,0.85)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            Made
            <br />
            personally
          </div>
        </div>
      </section>

      {/* WHAT CAN BE CREATED */}
      <section className="section">
        <p className="eyebrow">01 / YOUR IDEA</p>

        <h2>
          What would you like
          <br />
          <em>to turn into art?</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginTop: "60px",
          }}
        >
          {[
            {
              number: "01",
              title: "Portraits",
              text: "Turn a person, family member, or special moment into a personal artwork.",
            },
            {
              number: "02",
              title: "Memories",
              text: "Transform a meaningful place, moment, or memory into something lasting.",
            },
            {
              number: "03",
              title: "Personal ideas",
              text: "Have a concept in your mind? Share it and develop it with the artist.",
            },
            {
              number: "04",
              title: "Something unique",
              text: "If you have an idea that does not fit a category, start with the idea itself.",
            },
          ].map((item) => (
            <div
              key={item.number}
              style={{
                padding: "35px",
                minHeight: "220px",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                className="muted"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                }}
              >
                {item.number}
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "28px",
                    fontWeight: 400,
                    margin: "20px 0 10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="muted"
                  style={{
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--ivory)",
          padding: "140px 5vw",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <p className="eyebrow">02 / THE PROCESS</p>

          <h2
            style={{
              marginBottom: "70px",
            }}
          >
            From an idea
            <br />
            <em>to something real.</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "25px",
            }}
          >
            {[
              {
                number: "01",
                title: "Share your idea",
                text: "Tell Dipali what you have in mind through WhatsApp.",
              },
              {
                number: "02",
                title: "Discuss",
                text: "Discuss the concept, references, size, and other details.",
              },
              {
                number: "03",
                title: "Create",
                text: "Dipali creates the artwork around your agreed concept.",
              },
              {
                number: "04",
                title: "Receive",
                text: "Your finished artwork becomes something uniquely yours.",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{
                  borderTop: "1px solid rgba(247,243,238,0.2)",
                  paddingTop: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "#aaa39d",
                  }}
                >
                  {item.number}
                </span>

                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: 400,
                    fontSize: "25px",
                    margin: "25px 0 15px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#aaa39d",
                    lineHeight: 1.7,
                    fontSize: "13px",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTWORK */}
      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "8vw",
            alignItems: "center",
          }}
        >
          <div>
            <p className="eyebrow">03 / THE ART</p>

            <h2>
              Every piece
              <br />
              is <em>personal.</em>
            </h2>

            <p
              className="muted"
              style={{
                lineHeight: 1.9,
                maxWidth: "500px",
                marginTop: "30px",
              }}
            >
              Custom artwork is not selected from a catalogue. It begins with
              your idea and becomes a piece created specifically around it.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              background: "#e1d9d1",
            }}
          >
            <Image
              src={featuredArtwork.image}
              alt={featuredArtwork.title}
              fill
              sizes="(max-width: 900px) 90vw, 50vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "150px 5vw",
          background:
            "linear-gradient(135deg, #f4dddd 0%, #e8b8bd 50%, #d99aaa 100%)",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">04 / START A CONVERSATION</p>

        <h2
          style={{
            fontSize: "clamp(55px, 8vw, 105px)",
            margin: "25px auto",
            maxWidth: "1000px",
          }}
        >
          Have an idea?
          <br />
          <em>Let's create it.</em>
        </h2>

        <p
          style={{
            maxWidth: "520px",
            margin: "30px auto",
            lineHeight: 1.8,
            color: "rgba(25,23,21,0.65)",
          }}
        >
          Start by sharing your idea, reference, or inspiration. Dipali can
          discuss the possibilities with you directly.
        </p>

        <a
          href="#"
          className="button"
          style={{
            marginTop: "20px",
          }}
        >
          Chat on WhatsApp →
        </a>

        <p
          style={{
            marginTop: "25px",
            fontSize: "9px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(25,23,21,0.5)",
          }}
        >
          WhatsApp link will be connected before launch
        </p>
      </section>
    </main>
  );
}
