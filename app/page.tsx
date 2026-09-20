import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/data/artworks";

export default function Home() {
  const heroArtwork = artworks[0];
  const secondArtwork = artworks[1] || artworks[0];
  const thirdArtwork = artworks[2] || artworks[0];
  const fourthArtwork = artworks[3] || artworks[0];

  // Catalogue plate number = the artwork's real position in the collection
  const plate = (artwork: (typeof artworks)[number]) =>
    String(artworks.indexOf(artwork) + 1).padStart(2, "0");

  const price = (artwork: (typeof artworks)[number]) =>
    `₹${artwork.price.toLocaleString("en-IN")}`;

  const shownCount = Math.min(3, artworks.length);

  return (
    <main className="premiumHome">
      {/* =====================================================
          HERO — the painting is the object, unframed and bleeding
          off the right edge. A museum wall label sits across its
          left edge.
      ===================================================== */}

      <section className="premiumHero">
        <div className="premiumHeroStatement">
          <p className="premiumLabel">Dipali Singh, artist</p>

          <div className="premiumHeroCopy">
            <h1>
              <span>Art that</span>
              <span>feels personal.</span>
            </h1>

            <div className="premiumHeroBottom">
              <p>
                Original artwork created with emotion, atmosphere, and
                individuality.
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
        </div>

        <Link
          href={`/artwork/${heroArtwork.id}`}
          className="premiumHeroArtwork"
          aria-label={`View ${heroArtwork.title}`}
        >
          <div className="premiumHeroImage">
            <Image
              src={heroArtwork.image}
              alt={heroArtwork.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 60vw"
            />
          </div>

          <div className="premiumArtworkLabel">
            <span className="premiumArtworkLabelTop">
              <i>No. {plate(heroArtwork)}</i>
              Featured work
            </span>

            <strong>{heroArtwork.title}</strong>

            <span className="premiumArtworkLabelBottom">
              <small>{heroArtwork.category}</small>
              <span className="premiumArtworkLabelView">View ↗</span>
            </span>
          </div>
        </Link>
      </section>

      {/* =====================================================
          INTRO — an art statement, set like wall text
      ===================================================== */}

      <section className="premiumIntro">
        <p className="premiumLabel premiumIntroLabel">
          A quiet approach to art
        </p>

        <h2 className="premiumIntroTitle">
          <span>Paintings made to</span>
          <span>stay with you.</span>
        </h2>

        <div className="premiumIntroText">
          <p>
            Art can change the feeling of a room, preserve a memory, or simply
            give an emotion somewhere to exist.
          </p>

          <Link href="/shop" className="premiumTextLink">
            Discover the collection
            <span>↗</span>
          </Link>
        </div>

        <figure className="premiumIntroDetail">
          <div className="premiumIntroDetailImage">
            <Image
              src={heroArtwork.image}
              alt={`Detail of ${heroArtwork.title}`}
              fill
              sizes="(max-width: 900px) 70vw, 40vw"
            />
          </div>

          <figcaption>
            <i>Detail</i>
            {heroArtwork.title}
          </figcaption>
        </figure>
      </section>

      {/* =====================================================
          SELECTED WORKS — three scales, catalogue entries
      ===================================================== */}

      <section className="premiumWorks">
        <div className="premiumSectionHeader">
          <div>
            <p className="premiumLabel">Selected works</p>

            <h2>
              A collection of
              <br />
              original pieces.
            </h2>
          </div>

          <Link href="/shop" className="premiumTextLink">
            View all artwork
            <span>↗</span>
          </Link>
        </div>

        <div className="premiumWorksGrid">
          <Link
            href={`/artwork/${secondArtwork.id}`}
            className="premiumWork premiumWorkA"
          >
            <div className="premiumWorkImage">
              <Image
                src={secondArtwork.image}
                alt={secondArtwork.title}
                fill
                sizes="(max-width: 900px) 100vw, 56vw"
              />
            </div>

            <div className="premiumWorkMeta">
              <span className="premiumWorkNo">{plate(secondArtwork)}</span>

              <div>
                <strong>{secondArtwork.title}</strong>
                <span>{secondArtwork.category}</span>
              </div>

              <span className="premiumWorkPrice">{price(secondArtwork)}</span>
            </div>
          </Link>

          <Link
            href={`/artwork/${thirdArtwork.id}`}
            className="premiumWork premiumWorkB"
          >
            <div className="premiumWorkImage">
              <Image
                src={thirdArtwork.image}
                alt={thirdArtwork.title}
                fill
                sizes="(max-width: 900px) 70vw, 26vw"
              />
            </div>

            <div className="premiumWorkMeta">
              <span className="premiumWorkNo">{plate(thirdArtwork)}</span>

              <div>
                <strong>{thirdArtwork.title}</strong>
                <span>{thirdArtwork.category}</span>
              </div>

              <span className="premiumWorkPrice">{price(thirdArtwork)}</span>
            </div>
          </Link>

          <Link
            href={`/artwork/${fourthArtwork.id}`}
            className="premiumWork premiumWorkC"
          >
            <div className="premiumWorkImage">
              <Image
                src={fourthArtwork.image}
                alt={fourthArtwork.title}
                fill
                sizes="(max-width: 900px) 90vw, 34vw"
              />
            </div>

            <div className="premiumWorkMeta">
              <span className="premiumWorkNo">{plate(fourthArtwork)}</span>

              <div>
                <strong>{fourthArtwork.title}</strong>
                <span>{fourthArtwork.category}</span>
              </div>

              <span className="premiumWorkPrice">{price(fourthArtwork)}</span>
            </div>
          </Link>
        </div>

        <div className="premiumCollectionFooter">
          <span>
            Showing {shownCount} of {artworks.length} original works
          </span>

          <Link href="/shop" className="premiumTextLink">
            Enter the gallery
            <span>↗</span>
          </Link>
        </div>
      </section>

      {/* =====================================================
          ARTIST — a magazine profile on charcoal
      ===================================================== */}

      <section className="premiumArtist">
        <div className="premiumArtistHead">
          <p className="premiumLabel">The artist</p>

          <h2>
            <span>Art begins</span>
            <span>with a feeling.</span>
          </h2>
        </div>

        <figure className="premiumArtistImageWrap">
          <div className="premiumArtistImage">
            <Image
              src={heroArtwork.image}
              alt="Artwork by Dipali Singh"
              fill
              sizes="(max-width: 900px) 80vw, 34vw"
            />
          </div>

          <figcaption>Dipali Singh, artist</figcaption>
        </figure>

        <div className="premiumArtistContent">
          <p className="premiumArtistLead">
            Dipali Singh creates original artwork with a focus on expression,
            atmosphere, and individuality.
          </p>

          <p className="premiumArtistBody">
            Each piece is created to exist beyond the screen, becoming part of
            the space, memory, or story that surrounds it.
          </p>

          <dl className="premiumArtistFacts">
            <div>
              <dt>Collection</dt>
              <dd>{artworks.length} original works</dd>
            </div>

            <div>
              <dt>Custom work</dt>
              <dd>Commissions by enquiry</dd>
            </div>
          </dl>

          <Link href="/about" className="premiumButton premiumButtonLight">
            Discover Dipali&apos;s story
          </Link>
        </div>
      </section>

      {/* =====================================================
          CUSTOM ARTWORK — an invitation, not a banner
      ===================================================== */}

      <section className="premiumCommission">
        <div className="premiumCommissionContent">
          <p className="premiumLabel">Custom artwork</p>

          <h2>
            <span>Something only</span>
            <span>you could ask for.</span>
          </h2>

          <p className="premiumCommissionLead">
            Have a memory, portrait, idea, or feeling you want transformed into
            artwork? Commission a piece created around your story.
          </p>

          <div className="premiumCommissionBegin">
            <span>Begin with</span>

            <ul>
              {["A memory", "A portrait", "An idea", "A feeling"].map((item) => (
                <li key={item}>
                  <Link href="/commission">
                    <em>{item}</em>
                    <span>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/commission"
            className="premiumButton premiumButtonDark"
          >
            Create your artwork
            <span>↗</span>
          </Link>
        </div>

        <figure className="premiumCommissionVisual">
          <div className="premiumCommissionMat">
            <div className="premiumCommissionImage">
              <Image
                src={thirdArtwork.image}
                alt={thirdArtwork.title}
                fill
                sizes="(max-width: 900px) 70vw, 30vw"
              />
            </div>
          </div>

          <figcaption className="premiumCommissionTag">
            <strong>Made for you</strong>
            <span>Each commission is created for one person.</span>
          </figcaption>
        </figure>
      </section>

      {/* =====================================================
          STUDIO — a journal spread, figures and field notes
      ===================================================== */}

      <section className="premiumStudio">
        <div className="premiumStudioHeader">
          <div>
            <p className="premiumLabel">The studio</p>

            <h2>
              From the studio,
              <br />
              as it happens.
            </h2>
          </div>

          <p>
            Follow new work, studio moments, and glimpses behind the creative
            process.
          </p>
        </div>

        <div className="premiumStudioGrid">
          <figure className="premiumStudioTall">
            <div className="premiumStudioImage">
              <Image
                src={secondArtwork.image}
                alt={secondArtwork.title}
                fill
                sizes="(max-width: 900px) 90vw, 42vw"
              />
            </div>

            <figcaption>
              <i>Fig. 1</i>
              The work
            </figcaption>
          </figure>

          <figure className="premiumStudioSquare">
            <div className="premiumStudioImage">
              <Image
                src={fourthArtwork.image}
                alt={fourthArtwork.title}
                fill
                sizes="(max-width: 900px) 70vw, 28vw"
              />
            </div>

            <figcaption>
              <i>Fig. 2</i>
              Recent work
            </figcaption>
          </figure>

          <div className="premiumStudioText">
            <strong>Instagram</strong>

            <p>New artwork and moments from the studio.</p>

            <span className="premiumMuted">Social link to be added</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA — the closing page of the catalogue
      ===================================================== */}

      <section className="premiumFinalCta">
        <p className="premiumLabel">Art for your space, art for your story</p>

        <h2>
          <span>Find something</span>
          <span>that feels like you.</span>
        </h2>

        <div className="premiumFinalActions">
          <Link href="/shop" className="premiumButton">
            Explore the gallery
          </Link>

          <Link href="/commission" className="premiumTextLink">
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
            <span className="premiumFooterBrand">artistdipalisingh</span>

            <p>Original artwork and custom creations</p>
          </div>

          <div className="premiumFooterLinks">
            <div>
              <span>Explore</span>

              <Link href="/shop">Gallery</Link>
              <Link href="/about">About</Link>
              <Link href="/commission">Custom Art</Link>
            </div>

            <div>
              <span>Contact</span>

              <Link href="/commission">Commission enquiry</Link>
              <span>Social link to be added</span>
            </div>
          </div>
        </div>

        <div className="premiumFooterBottom">
          <span>© {new Date().getFullYear()} Dipali Singh</span>

          <span>All rights reserved</span>
        </div>
      </footer>
    </main>
  );
}
