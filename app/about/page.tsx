export default function About() {
  return (
    <main>
      {/* HERO */}
      <section
        className="section"
        style={{
          minHeight: "calc(100vh - 78px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          <p className="eyebrow">THE ARTIST</p>

          <h1>
            Dipali
            <br />
            <em>Singh.</em>
          </h1>

          <p
            className="muted"
            style={{
              maxWidth: "600px",
              fontSize: "16px",
            }}
          >
            An artist creating expressive, thoughtful artwork with a focus on
            emotion, atmosphere, and the beauty found in everyday moments.
          </p>
        </div>
      </section>

      {/* ARTIST STORY */}
      <section className="section">
        <div className="artistStoryGrid" style={{ gap: "7vw" }}>
          <div
            style={{
              aspectRatio: "4 / 5",
              background:
                "linear-gradient(135deg, #ead8d5, #e7bfc3, #d8b1bd)",
              overflow: "hidden",
            }}
          >
            {/* Artist portrait can be added here later */}
          </div>

          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">THE STORY</p>

            <h2>
              Creating art
              <br />
              with <em>meaning.</em>
            </h2>

            <p className="muted">
              Dipali Singh's work is rooted in observation, emotion, and a
              personal connection with the subjects she creates.
            </p>

            <p className="muted">
              Each artwork is created with the intention of bringing
              character and feeling into the spaces where it lives.
            </p>

            <p className="muted">
              Alongside her original artwork, Dipali also creates custom
              pieces based on individual ideas, memories, and spaces.
            </p>
          </div>
        </div>
      </section>

      {/* ARTISTIC APPROACH */}
      <section className="pinkSection">
        <div className="section">
          <p className="eyebrow">ARTISTIC APPROACH</p>

          <h2
            style={{
              maxWidth: "850px",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "clamp(42px, 6vw, 78px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            Art made to become part of your{" "}
            <em>story.</em>
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "600px",
              marginTop: "35px",
            }}
          >
            Whether it is an original piece or something created specifically
            for you, the goal is simple: artwork that feels personal rather
            than ordinary.
          </p>
        </div>
      </section>

      {/* CUSTOM ART */}
      <section className="dark">
        <div style={{ maxWidth: "850px" }}>
          <p className="eyebrow">CUSTOM ARTWORK</p>

          <h2>
            Have an idea?
            <br />
            <em>Make it art.</em>
          </h2>

          <p
            className="muted"
            style={{
              maxWidth: "560px",
              marginBottom: "35px",
            }}
          >
            Dipali also creates artwork based on your ideas, references,
            memories, or the feeling you want to bring into a space.
          </p>

          <a className="button" href="/commission">
            Explore Custom Art
          </a>
        </div>
      </section>
    </main>
  );
}
