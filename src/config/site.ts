/**
 * Site configuration — the single source of truth for game-specific metadata.
 *
 * 👉 APPLY TEMPLATE: Change every field here when building a new game wiki.
 * This is part of the CONFIG LAYER — framework code reads from here, never the reverse.
 */

export interface SiteConfig {
  /** Full site name, used in <title> suffix and Organization JSON-LD. e.g. "Anvil Quest Wiki" */
  name: string;
  /** Short name for PWA manifest, mobile logo, and the long-title <title> suffix (>50 chars). e.g. "AQ Wiki" */
  shortName: string;
  /** Site description for Organization JSON-LD and og:site_name. */
  description: string;
  /** Domain without protocol or trailing slash. e.g. "anvilquestwiki.wiki" */
  domain: string;
  /** Hero tagline shown under the site title. */
  tagline: string;
  /** Copyright / legal disclaimer line shown in footer. */
  legalNotice: string;
  /**
   * Optional public contact email — rendered as a mailto link on the contact
   * page when set. AdSense reviewers look for a reachable contact channel;
   * if you run no social channels, set this.
   */
  contactEmail?: string;
  social: {
    /** Official game website URL (the game itself, not the wiki). */
    official: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    reddit?: string;
  };
  /**
   * Canonical URLs about the GAME (Steam page, official site, Wikipedia entry…).
   * Emitted as Organization JSON-LD `sameAs` — helps Google / AI engines link
   * this wiki to the game's knowledge-graph entity.
   */
  sameAs?: string[];
  game: {
    /** Full game name. */
    name: string;
    /** Platform: "Roblox" | "Steam" | "Epic Games" | "Mobile" | ... */
    platform: string;
    /** Developer / studio name. */
    developer: string;
    /** Genre description. */
    genre: string;
    /** ISO release date (optional). */
    releaseDate?: string;
  };
  /**
   * Dimensions of the default OG/Twitter share image (public/images/hero.webp).
   * Emitted as og:image:width / og:image:height so social crawlers can render
   * the share card without downloading the image first.
   */
  ogImageWidth: number;
  ogImageHeight: number;
  /** Default author name for articles without an explicit `author` in frontmatter (E-E-A-T signal). */
  defaultAuthor?: string;
}

export const site: SiteConfig = {
  name: 'Break and Steal an Egg Wiki',
  shortName: 'BreakEgg Guide',
  description: 'Honest guide to Break and Steal an Egg: how free rewards really work (no text codes), beginner tips, and pet coverage re-verified after every update.',
  domain: 'wenta0v0-dot.github.io/breakegg-guide',
  tagline: 'Break eggs, hatch pets, steal animals back — honest guides and verified rewards',
  legalNotice: 'BreakEgg Guide is an unofficial, player-made fan site. Not affiliated with Roblox Corporation or the developers of Break and Steal an Egg.',
  // Set a real address if you run no social channels — the contact page
  // renders it as a mailto link.
  contactEmail: '',
  social: {
    official: 'https://www.roblox.com/games/114326934417838',
  },
  game: {
    name: 'Break and Steal an Egg',
    platform: 'Roblox',
    developer: 'ILGames x Eggs',
    genre: 'Simulation',
    releaseDate: '2026-09-05',
  },
  // og:image dims of the SHIPPED hero.webp — if you replace public/images/hero.webp,
  // update these in src/config/site.ts to match (wrong dims mis-crop share cards).
  ogImageWidth: 1200,
  ogImageHeight: 630,
  /** E-E-A-T: articles without an explicit author render this name. */
  defaultAuthor: 'BreakEgg Guide',
};

/** Absolute site URL (no trailing slash). Falls back to the Astro `site` config. */
export const siteUrl: string = (process.env.SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  '',
);
