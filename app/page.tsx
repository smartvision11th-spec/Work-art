import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";

export default function Home() {
  const heroArtwork = artworks[0];
  const secondArtwork = artworks[1] || artworks[0];
  const thirdArtwork = artworks[2] || artworks[0];
  const fourthArtwork = artworks[3] || artworks[0];

  return (
    <main className="premiumHome">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="premiumHero">

        <div className="premiumHeroStatement">

          <p className="premiumEyebrow">
            ARTIST · DIPALI SINGH
          </p>

          <h1>
            Art that
            <br />
            <em>feels personal.</em>
          </h1>

          <div className="premiumHeroBottom">

            <p>
              Original artwork created with emotion,
              atmosphere, and individuality.
            </p>

            <div className="premiumHeroLinks">
              <Link href="/shop" className="premiumButton">
                Explore artwork
              </Link>

              <Link href="/about" className="premiumTextLink">
                Meet the artist
                <span>↗</span>
              </Link>
            </div>

          </div>

        </div>


        <Link
          href={`/artwork/${heroArtwork.id}`}
          className="premiumHeroArtwork"
        >

          <div className="premiumHeroImage">

            <Image
              src={heroArtwork.image}
              alt={heroArtwork.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 58vw"
            />

            <div className="premiumHeroOverlay" />

          </div>

          <div className="premiumArtworkLabel">

            <div>
              <span>Featured work</span>

              <strong>
                {heroArtwork.title}
              </strong>

              <small>
                {heroArtwork.category}
              </small>
            </div>

            <span className="premiumArtworkNumber">
              01
            </span>

          </div>

        </Link>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="premiumIntro">

        <div className="premiumIntroNumber">
          01
        </div>

        <div className="premiumIntroContent">

          <p className="premiumEyebrow">
            A QUIET APPROACH TO ART
          </p>

          <h2>
            Paintings made to
            <br />
            <em>stay with you.</em>
          </h2>

          <div className="premiumIntroText">

            <p>
              Art can change the feeling of a room,
              preserve a memory, or simply give an
              emotion somewhere to exist.
            </p>

            <Link
              href="/shop"
              className="premiumTextLink"
            >
              Discover the collection
              <span>↗</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          SELECTED WORKS
      ===================================================== */}

      <section className="premiumWorks">

        <div className="premiumSectionHeader">

          <div>
            <p className="premiumEyebrow">
              02 / SELECTED WORKS
            </p>

            <h2>
              A collection of
              <br />
              <em>original pieces.</em>
            </h2>
          </div>

          <Link
            href="/shop"
            className="premiumTextLink"
          >
            View all artwork
            <span>↗</span>
          </Link>

        </div>


        <div className="premiumWorksGrid">

          {/* Large artwork */}

          {secondArtwork && (
            <Link
              href={`/artwork/${secondArtwork.id}`}
              className="premiumWorkLarge"
            >

              <div className="premiumWorkImage">

                <Image
                  src={secondArtwork.image}
                  alt={secondArtwork.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 52vw"
                />

                <span className="premiumWorkView">
                  View artwork ↗
                </span>

              </div>

              <div className="premiumWorkMeta">

                <div>
                  <strong>
                    {secondArtwork.title}
                  </strong>

                  <span>
                    {secondArtwork.category}
                  </span>
                </div>

                <span>
                  ₹{secondArtwork.price.toLocaleString("en-IN")}
                </span>

              </div>

            </Link>
          )}


          {/* Smaller artworks */}

          <div className="premiumWorkSide">

            {thirdArtwork && (
              <Link
                href={`/artwork/${thirdArtwork.id}`}
                className="premiumWorkSmall premiumWorkSmallFirst"
              >

                <div className="premiumWorkImage">

                  <Image
                    src={thirdArtwork.image}
                    alt={thirdArtwork.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 25vw"
                  />

                  <span className="premiumWorkView">
                    View ↗
                  </span>

                </div>

                <div className="premiumWorkMeta">

                  <div>
                    <strong>
                      {thirdArtwork.title}
                    </strong>

                    <span>
                      {thirdArtwork.category}
                    </span>
                  </div>

                </div>

              </Link>
            )}


            {fourthArtwork && (
              <Link
                href={`/artwork/${fourthArtwork.id}`}
                className="premiumWorkSmall premiumWorkSmallSecond"
              >

                <div className="premiumWorkImage">

                  <Image
                    src={fourthArtwork.image}
                    alt={fourthArtwork.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 25vw"
                  />

                  <span className="premiumWorkView">
                    View ↗
                  </span>

                </div>

                <div className="premiumWorkMeta">

                  <div>
                    <strong>
                      {fourthArtwork.title}
                    </strong>

                    <span>
                      {fourthArtwork.category}
                    </span>
                  </div>

                </div>

              </Link>
            )}

          </div>

        </div>


        <div className="premiumCollectionFooter">

          <span>
            ORIGINAL WORKS · DIPALI SINGH
          </span>

          <span>
            {artworks.length.toString().padStart(2, "0")} PIECES
          </span>

        </div>

      </section>


      {/* =====================================================
          ARTIST
      ===================================================== */}

      <section className="premiumArtist">

        <div className="premiumArtistImageWrap">

          <div className="premiumArtistImage">

            <Image
              src={heroArtwork.image}
              alt="Artwork by Dipali Singh"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />

          </div>

          <span className="premiumArtistImageLabel">
            DIPALI SINGH · ARTIST
          </span>

        </div>


        <div className="premiumArtistContent">

          <p className="premiumEyebrow">
            03 / THE ARTIST
          </p>

          <h2>
            Art begins
            <br />
            with a <em>feeling.</em>
          </h2>

          <div className="premiumArtistCopy">

            <p>
              Dipali Singh creates original artwork
              with a focus on expression, atmosphere,
              and individuality.
            </p>

            <p>
              Each piece is created to exist beyond
              the screen, becoming part of the space,
              memory, or story that surrounds it.
            </p>

          </div>

          <Link
            href="/about"
            className="premiumButton premiumButtonLight"
          >
            Discover Dipali's story
          </Link>

        </div>

      </section>


      {/* =====================================================
          CUSTOM ART
      ===================================================== */}

      <section className="premiumCommission">

        <div className="premiumCommissionGlow" />

        <div className="premiumCommissionContent">

          <p className="premiumEyebrow">
            04 / CUSTOM ARTWORK
          </p>

          <h2>
            Something only
            <br />
            <em>you could ask for.</em>
          </h2>

          <p>
            Have a memory, portrait, idea, or feeling
            you want transformed into artwork?
            Commission a piece created around your
            story.
          </p>

          <Link
            href="/commission"
            className="premiumButton premiumButtonDark"
          >
            Create your artwork
            <span>↗</span>
          </Link>

        </div>


        <div className="premiumCommissionVisual">

          <div className="premiumCommissionCircle" />

          <div className="premiumCommissionFrame">

            <div className="premiumCommissionImage">

              <Image
                src={thirdArtwork.image}
                alt={thirdArtwork.title}
                fill
                sizes="(max-width: 900px) 75vw, 30vw"
              />

            </div>

          </div>

          <span className="premiumCommissionStamp">
            MADE
            <br />
            FOR
            <br />
            YOU
          </span>

        </div>

      </section>


      {/* =====================================================
          STUDIO
      ===================================================== */}

      <section className="premiumStudio">

        <div className="premiumStudioHeader">

          <div>

            <p className="premiumEyebrow">
              05 / THE STUDIO
            </p>

            <h2>
              From the studio,
              <br />
              <em>as it happens.</em>
            </h2>

          </div>

          <p>
            Follow new work, studio moments,
            and glimpses behind the creative process.
          </p>

        </div>


        <div className="premiumStudioGrid">

          <div className="premiumStudioTall">

            <Image
              src={secondArtwork.image}
              alt={secondArtwork.title}
              fill
              sizes="(max-width: 700px) 100vw, 32vw"
            />

            <span>
              THE WORK
            </span>

          </div>


          <div className="premiumStudioText">

            <span className="premiumStudioMark">
              DS
            </span>

            <div>

              <strong>
                Instagram
              </strong>

              <p>
                New artwork and moments from
                the studio.
              </p>

              <span className="premiumMuted">
                Social link to be added
              </span>

            </div>

          </div>


          <div className="premiumStudioSquare">

            <Image
              src={fourthArtwork.image}
              alt={fourthArtwork.title}
              fill
              sizes="(max-width: 700px) 100vw, 28vw"
            />

            <span>
              RECENT WORK
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="premiumFinalCta">

        <p className="premiumEyebrow">
          ART FOR YOUR SPACE · ART FOR YOUR STORY
        </p>

        <h2>
          Find something
          <br />
          <em>that feels like you.</em>
        </h2>

        <div className="premiumFinalActions">

          <Link
            href="/shop"
            className="premiumButton"
          >
            Explore the gallery
          </Link>

          <Link
            href="/commission"
            className="premiumTextLink"
          >
            Commission a piece
            <span>↗</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="premiumFooter">

        <div className="premiumFooterMain">

          <div>

            <span className="premiumFooterBrand">
              DIPALI
              <br />
              SINGH
            </span>

            <p>
              Original artwork · Custom creations
            </p>

          </div>


          <div className="premiumFooterLinks">

            <div>

              <span>
                EXPLORE
              </span>

              <Link href="/shop">
                Gallery
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/commission">
                Custom Art
              </Link>

            </div>


            <div>

              <span>
                CONTACT
              </span>

              <Link href="/commission">
                Commission enquiry
              </Link>

              <span>
                Social link to be added
              </span>

            </div>

          </div>

        </div>


        <div className="premiumFooterBottom">

          <span>
            © {new Date().getFullYear()} DIPALI SINGH
          </span>

          <span>
            ALL RIGHTS RESERVED
          </span>

        </div>

      </footer>

    </main>
  );
}
