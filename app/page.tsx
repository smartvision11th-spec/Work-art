import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";

export default function Home() {
  const heroArtwork = artworks[0];
  const storyArtwork = artworks[1] || artworks[0];
  const customArtwork = artworks[2] || artworks[0];

  return (
    <main className="premiumHome">

      {/* =========================
          HERO
      ========================= */}

      <section className="premiumHero">
        <div className="premiumHeroText">
          <div>
            <p className="eyebrow">ARTIST · DIPALI SINGH</p>

            <h1>
              Art that
              <br />
              <em>feels personal.</em>
            </h1>

            <p className="premiumHeroDescription">
              Original artwork created with emotion, character,
              and a quiet sense of individuality.
            </p>

            <div className="premiumHeroActions">
              <Link className="button" href="/shop">
                Explore the collection
              </Link>

              <Link className="premiumTextLink" href="/about">
                Meet the artist
              </Link>
            </div>
          </div>

          <div className="premiumHeroBottom">
            <span>Original works</span>
            <span>Custom artwork</span>
            <span>Dipali Singh</span>
          </div>
        </div>

        <Link
          href={`/artwork/${heroArtwork.id}`}
          className="premiumHeroImage"
        >
          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />

          <div className="heroImageOverlay" />

          <div className="heroArtworkInfo">
            <div>
              <span>{heroArtwork.category}</span>
              <strong>{heroArtwork.title}</strong>
            </div>

            <span>View work ↗</span>
          </div>

          <div className="heroNumber">01</div>
        </Link>
      </section>


      {/* =========================
          INTRO
      ========================= */}

      <section className="premiumIntro">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
        </div>

        <div className="premiumIntroText">
          <h2>
            Works created to
            <br />
            <em>stay with you.</em>
          </h2>

          <p>
            A collection of original paintings created by Dipali Singh,
            each carrying its own atmosphere, character, and story.
          </p>

          <Link className="premiumTextLink" href="/shop">
            View all works →
          </Link>
        </div>
      </section>


      {/* =========================
          SELECTED WORKS
      ========================= */}

      <section className="premiumWorks">

        {artworks[0] && (
          <Link
            href={`/artwork/${artworks[0].id}`}
            className="premiumLargeWork"
          >
            <div className="premiumWorkImage">
              <Image
                src={artworks[0].image}
                alt={artworks[0].title}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            </div>

            <div className="premiumWorkMeta">
              <div>
                <strong>{artworks[0].title}</strong>
                <span>{artworks[0].category}</span>
              </div>

              <span>
                ₹{artworks[0].price.toLocaleString("en-IN")}
              </span>
            </div>
          </Link>
        )}

        <div className="premiumSmallWorks">

          {artworks.slice(1, 3).map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/artwork/${artwork.id}`}
              className={
                index === 0
                  ? "premiumSmallWork premiumSmallWorkOffset"
                  : "premiumSmallWork"
              }
            >
              <div className="premiumWorkImage">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                />
              </div>

              <div className="premiumWorkMeta">
                <div>
                  <strong>{artwork.title}</strong>
                  <span>{artwork.category}</span>
                </div>

                <span>
                  ₹{artwork.price.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </section>


      {/* =========================
          ARTIST
      ========================= */}

      <section className="premiumArtist">

        <div className="premiumArtistImage">
          <Image
            src={storyArtwork.image}
            alt={storyArtwork.title}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />

          <span>Dipali Singh · Artist</span>
        </div>

        <div className="premiumArtistCopy">
          <p className="eyebrow">THE ARTIST</p>

          <h2>
            Art begins
            <br />
            with a <em>feeling.</em>
          </h2>

          <p>
            Dipali Singh creates original artwork with a focus on
            expression, atmosphere, and individuality.
          </p>

          <p>
            Each piece is made to exist beyond the screen,
            becoming part of the space, memory, or story around it.
          </p>

          <Link className="button" href="/about">
            Discover Dipali's story
          </Link>
        </div>

      </section>


      {/* =========================
          CUSTOM ART
      ========================= */}

      <section className="premiumCommission">

        <div className="premiumCommissionText">
          <p className="eyebrow">CUSTOM ARTWORK</p>

          <h2>
            Your idea.
            <br />
            <em>Her art.</em>
          </h2>

          <p>
            A portrait, a memory, a place, or simply an idea you've
            been carrying for a while. Dipali creates artwork around
            what makes it personal to you.
          </p>

          <Link className="button premiumDarkButton" href="/commission">
            Create something personal
          </Link>
        </div>

        <div className="premiumCommissionVisual">

          <div className="commissionCircle" />

          <div className="commissionArtwork">
            <Image
              src={customArtwork.image}
              alt={customArtwork.title}
              fill
              sizes="(max-width: 900px) 75vw, 30vw"
            />
          </div>

          <span className="commissionLabel">
            Made personally
            <br />
            for you
          </span>

        </div>

      </section>


      {/* =========================
          STUDIO / SOCIAL
      ========================= */}

      <section className="premiumStudio">

        <div className="premiumStudioHeader">
          <div>
            <p className="eyebrow">THE STUDIO</p>

            <h2>
              Follow the
              <br />
              <em>creative process.</em>
            </h2>
          </div>

          <p>
            New artwork, studio moments, and glimpses
            behind the work.
          </p>
        </div>

        <div className="premiumStudioLinks">

          <div>
            <span className="studioNumber">01</span>

            <h3>Instagram</h3>

            <span className="studioLinkText">
              Follow the studio ↗
            </span>
          </div>

          <Link href="/commission">
            <span className="studioNumber">02</span>

            <h3>Custom Art</h3>

            <span className="studioLinkText">
              Start a commission →
            </span>
          </Link>

          <Link href="/about">
            <span className="studioNumber">03</span>

            <h3>About</h3>

            <span className="studioLinkText">
              Meet Dipali →
            </span>
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="premiumFooter">

        <div className="premiumFooterTop">

          <div>
            <div className="premiumFooterName">
              Dipali Singh
            </div>

            <p>
              Artist · Original artwork · Custom creations
            </p>
          </div>

          <div className="premiumFooterLinks">
            <Link href="/shop">Gallery</Link>
            <Link href="/about">About</Link>
            <Link href="/commission">Custom Art</Link>
            <Link href="/cart">Bag</Link>
          </div>

        </div>

        <div className="premiumFooterBottom">
          © {new Date().getFullYear()} Dipali Singh · All rights reserved
        </div>

      </footer>

    </main>
  );
}
