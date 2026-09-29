/* =====================================================================
   VICTORY PORTFOLIO: CONTENT
   ---------------------------------------------------------------------
   This is the only file you should need to touch for day to day updates:
   new sample, new book, a changed sentence in your bio, a new job.

   Structure of this file:
     PROFILE      -> name, contact, bio, hero status lines
     HOW_I_WORK   -> the six step process panel
     SKILLS       -> grouped, filterable skill list
     TOOLS        -> flat list of tools/platforms
     EXPERIENCE   -> the timeline
     EDUCATION    -> the education list
     SERVICES     -> what people can hire you for
     BOOKS        -> fiction, chess, and academic publishing
     SAMPLES      -> full writing samples (the reading room)
     RECRUITER    -> the short pitch shown in "reading this as a" toggle
     CLIENT       -> the other half of that toggle

   Rules of thumb when you edit:
     - Never invent a stat, employer, client name or result you can't stand
       behind. Leave it out instead, or write "ask me" as the value.
     - Keep dates and numbers honest. It's fine for something to say
       "In progress".
     - If a field says link: null, that means there's no verified URL yet.
       Fill it in once you have one; until then the site will just show
       the platform name as plain text instead of a broken link.
   ===================================================================== */

const PROFILE = {
  name: "Chijioke Victory",
  shortName: "Victory",
  pennName: "Helium C.",
  location: "Aba, Abia State, Nigeria",
  availability: "Full-time remote, available now",

  email: "chinazomchijioke2@gmail.com",
  phoneDisplay: "+234 708 520 4571",
  phoneHref: "tel:+2347085204571",
  linkedIn: "https://www.linkedin.com/in/angel-chijioke-368409329",
  linkedInLabel: "Angel Chijioke",
  fiverr: "https://www.fiverr.com/thecontentfarm",
  fiverrLabel: "TheContentFarm on Fiverr",

  roles: ["Writer", "Researcher", "Customer Experience"],

  heroLead:
    "I write, research, and answer for people who need it done properly, and I'm looking for a full-time remote seat to keep doing it in.",

  // Status lines for the small "currently" panel in the hero.
  // Keep these true to what you're actually doing. Swap them out as your
  // work changes.
  statusLines: [
    "Drafting an SEO article on soil and nutrient runoff",
    "Answering a client's revision note before the deadline",
    "Formatting the next Between Two Darks chapter for Kobo",
    "Reviewing plant physiology notes for a UNIPORT exam",
  ],

  pullQuote: "I simplify by removing the unnecessary details, not the important ones.",
  pullQuoteCaption: "How I write a reply, and how I write an article.",

  about: [
    "I'm a freelance writer and researcher with a science background, and most days the two overlap directly. Alongside my degree at the University of Port Harcourt, I run Victory Writing Services: ghostwriting, SEO content, science communication, and academic writing, mostly through Fiverr under the name TheContentFarm.",
    "The freelance work is already the job I'm looking for. A client writes in, I figure out what they actually need, I research it properly, I answer in plain language, and I stay with the thread until it's resolved. That happens over chat and email, often with more than one client at once, with no manager checking my replies before they go out.",
    "I also write and publish fiction under the pen name Helium C.: a three book dark gothic trilogy and two chess instructional books, both independently researched, written, formatted, and published. Nobody assigned that work. I finished it anyway, which is the same habit a support seat or a writing client needs from someone remote.",
    "That science background is why I can take dense material and make it usable. The writing samples on this site aren't a side hustle I'm trying to sell you. They're what my writing looks like when accuracy and tone both have to hold up.",
  ],
};

const HOW_I_WORK = [
  {
    step: 1,
    title: "Understand",
    body: "I don't start from a guess. If a brief is thin, a client's message is ambiguous, or a support ticket doesn't say enough, I ask before I write a single line.",
  },
  {
    step: 2,
    title: "Research",
    body: "For science or technical topics, I check claims against real sources before I explain them. For a support ticket, I dig into the actual issue behind the first sentence of the complaint.",
  },
  {
    step: 3,
    title: "Structure",
    body: "Long or short, I map the shape before I fill it in: an outline for an article, a short checklist for a reply, so nothing gets lost between the question and the answer.",
  },
  {
    step: 4,
    title: "Create",
    body: "I write in the register the reader needs: plain for a customer, precise for a scientific audience, in someone else's voice for a ghostwriting client, and I reread it as if I were them.",
  },
  {
    step: 5,
    title: "Review",
    body: "A draft doesn't go out until I've checked it against the brief, the facts, and the tone. Revisions are part of the process, not a sign that something went wrong.",
  },
  {
    step: 6,
    title: "Deliver",
    body: "On deadline, documented, and followed up. If something's still open, it stays on my list until it's closed, not until someone has to ask about it a second time.",
  },
];

const SKILLS = [
  {
    category: "Writing & Content",
    items: [
      "Ghostwriting (fiction, nonfiction, professional, NDA friendly)",
      "SEO and web content",
      "Editorial and opinion writing",
      "Science communication",
      "Academic and instructional writing",
      "Rewriting AI drafted text into natural, human sounding copy",
    ],
  },
  {
    category: "Research & Accuracy",
    items: [
      "Fact checking and source verification",
      "Background and literature research",
      "Turning dense material into plain language without losing the substance",
      "Information gathering for articles and reports",
    ],
  },
  {
    category: "Communication & CX",
    items: [
      "Client communication over chat and email",
      "Inquiry handling and troubleshooting",
      "Feedback and revision handling, calmly, on deadline",
      "Professional correspondence and documentation",
    ],
  },
  {
    category: "Technical & Digital",
    items: [
      "Google Workspace and Microsoft Office",
      "Digital publishing workflows (Kobo Writing Life, MegaNovel, Publiseer)",
      "Quick to learn CRM and help desk tools (Zendesk, Intercom, Freshdesk, and similar)",
      "Python and ReportLab for structured PDF output",
    ],
  },
  {
    category: "Science",
    items: [
      "Plant science and biotechnology (BSc in progress)",
      "Genetics, ecology, and biostatistics",
      "Plant physiology and biological techniques",
      "Laboratory documentation and reporting",
    ],
  },
];

const TOOLS = [
  "Google Docs, Gmail, Sheets",
  "Microsoft Word, Excel",
  "Trello",
  "Slack",
  "Kobo Writing Life",
  "ReportLab (Python)",
  "Email and live chat",
  "CRM / help desk, quick to learn",
];

const EXPERIENCE = [
  {
    role: "Founder & Freelance Writer",
    org: "Victory Writing Services · Fiverr: TheContentFarm",
    place: "Remote",
    dates: "2025 to present",
    bullets: [
      "Write and publish the Between Two Darks dark gothic trilogy on Kobo Writing Life, managing manuscript development, formatting, and upload end to end.",
      "Deliver ghostwriting across fiction, nonfiction, and professional work under NDA, matching each client's voice through iterative revisions.",
      "Produce SEO aware articles and science communication pieces for general audiences, and rewrite AI assisted drafts into natural, human sounding copy.",
      "Handle client inquiries over chat and email end to end: clarify the brief, research the issue, and stay with the thread until it's resolved.",
      "Manage several client accounts and publishing workflows at once, across time zones, with no supervisor on the thread.",
    ],
  },
  {
    role: "Author, 200-Level Plant Science & Biotechnology Textbook",
    org: "Independent project, University of Port Harcourt",
    place: "Remote",
    dates: "2025",
    bullets: [
      "Built an eight-course textbook covering Genetics, Ecology, Biostatistics, Plant Physiology, Biological Techniques, and more.",
      "Designed the learning architecture from scratch: mnemonics, MCQ drills, worked examples, and Nigerian case studies.",
      "Ran the full lifecycle (research, writing, formatting, revision) using Python and ReportLab for the final PDF output.",
    ],
  },
  {
    role: "Department Representative Council",
    org: "NAPSABS, University of Port Harcourt",
    place: "Port Harcourt, Nigeria",
    dates: "Ongoing",
    bullets: [
      "Represent fellow Plant Science and Biotechnology students on departmental matters, which means regular written and verbal communication with peers and staff.",
    ],
  },
];

const EDUCATION = [
  {
    title: "B.Sc. Plant Science & Biotechnology",
    org: "University of Port Harcourt (UNIPORT), Faculty of Science",
    dates: "In progress · 300 Level",
    note: "Laboratory work, biostatistics, and scientific documentation, alongside the Department Representative Council role with NAPSABS.",
  },
  {
    title: "Senior Secondary Certificate",
    org: "Oxfords International School, Aba",
    dates: "",
    note: "",
  },
  {
    title: "Junior Secondary Certificate",
    org: "Evangel Seminary School, Aba",
    dates: "",
    note: "",
  },
];

const SERVICES = [
  {
    group: "Writing",
    blurb: "The core of Victory Writing Services.",
    items: [
      "Ghostwriting (fiction, nonfiction, professional pieces, NDA friendly)",
      "SEO and web content",
      "Science and technical communication",
      "Academic and instructional writing, including full textbooks",
      "Editing, proofreading, and turning an AI draft into natural copy",
    ],
  },
  {
    group: "Research",
    blurb: "The part of writing that happens before the writing.",
    items: [
      "Fact checking and source verification",
      "Background and literature research",
      "Information gathering for an article, report, or brief",
    ],
  },
  {
    group: "Communication & Support",
    blurb: "The same habits, pointed at a customer instead of a reader.",
    items: [
      "Customer support over chat and email",
      "Client facing correspondence",
      "Documentation of processes, logs, and briefs",
    ],
  },
];

/* ---------------------------------------------------------------------
   BOOKS
   kind: "fiction" | "chess" | "academic"
   link: null means there's no public product link yet. Add the real
   Kobo (or other storefront) URL here once you have it and the site
   will turn the platform name into a working link automatically.
   --------------------------------------------------------------------- */
const BOOKS = [
  {
    slug: "born-wrong",
    kind: "fiction",
    series: "Between Two Darks",
    part: "Book One",
    title: "Born Wrong",
    subtitle: "Sabrina · Book One of the Sabrina Universe",
    year: "2025",
    platform: "Kobo Writing Life",
    link: null,
    blurb:
      "A girl born wrong, a demon prince who won't stay buried, and a city where prayer isn't enough. Book One opens the trilogy in Florence, where blood and faith start to collide.",
  },
  {
    slug: "armon-and-rosa",
    kind: "fiction",
    series: "Between Two Darks",
    part: "Book Two",
    title: "Armon & Rosa",
    subtitle: "Between Two Darks · Book Two",
    year: "2025",
    platform: "Kobo Writing Life",
    link: null,
    blurb:
      "A stranger arrives at a ranch called La Luna, and what starts there becomes a marriage neither Armon nor Rosa can fully explain, and a council that wants to know exactly what he is.",
  },
  {
    slug: "marco",
    kind: "fiction",
    series: "Between Two Darks",
    part: "Book Three",
    title: "Marco",
    subtitle: "Between Two Darks · Book Three",
    year: "2025",
    platform: "Kobo Writing Life",
    link: null,
    blurb:
      "The trilogy closes across Vienna and Florence, as Marco inherits a war he didn't start and has to decide exactly what he's willing to protect, and what it will cost him.",
  },
  {
    slug: "the-first-rank",
    kind: "chess",
    series: "Chess Instruction",
    part: "Book One",
    title: "The First Rank",
    subtitle: "A Beginner's Survival Manual",
    year: "2025",
    platform: "Kobo Writing Life",
    link: null,
    blurb:
      "A beginner's guide built around one idea: chess improves when you learn to hold the board in your head, not just look at it on the screen. Structured visualization drills, not just theory.",
  },
  {
    slug: "the-thinking-player",
    kind: "chess",
    series: "Chess Instruction",
    part: "Book Two",
    title: "The Thinking Player",
    subtitle: "From Surviving to Competing",
    year: "2025",
    platform: "Kobo Writing Life",
    link: null,
    blurb:
      "For players stuck between roughly 1000 and 1600 rating: the book that moves you from playing on instinct to actually calculating, with drills built to be measured over your next hundred games.",
  },
  {
    slug: "plant-science-textbook",
    kind: "academic",
    series: "Academic Publishing",
    part: null,
    title: "Plant Science & Biotechnology",
    subtitle: "200-Level textbook · eight courses",
    year: "2025",
    platform: "University of Port Harcourt",
    link: null,
    blurb:
      "An eight-course textbook covering Genetics, Ecology, Biostatistics, Plant Physiology, Biological Techniques, and more, built with mnemonics, MCQ drills, worked examples, and Nigerian case studies. Written and distributed independently, outside any official course requirement.",
  },
];

/* ---------------------------------------------------------------------
   SAMPLES
   Full writing samples, shown in the reading room. body[] blocks can be
   type "p" (paragraph), "h2" (subheading), or "quote" (pull quote).
   --------------------------------------------------------------------- */
const SAMPLES = [
  {
    slug: "nutrient-runoff",
    title: "The Farm Is Not the Problem. What Leaves It Is.",
    dek: "On nutrient runoff, dead zones, and the environmental cost of feeding the world.",
    category: "SEO",
    wordCount: 1150,
    year: "2025",
    featured: true,
    excerpt:
      "Most people think water pollution looks like a factory dumping waste into a river. It usually does not. Sometimes it looks like a farmer doing exactly what he is supposed to do.",
    body: [
      { type: "p", text: "Most people think water pollution looks like a factory dumping waste into a river. It usually does not." },
      { type: "p", text: "Sometimes it looks like a farmer doing exactly what he is supposed to do. Feeding crops. Improving yield. Keeping his land productive. The pollution is invisible at the source. It only becomes visible somewhere else, in a stream that runs cloudy, a river that smells wrong, a stretch of coastline where nothing lives anymore." },
      { type: "p", text: "This is the problem of nutrient runoff, and it is one of the most widespread and least discussed environmental crises affecting agriculture today." },
      { type: "h2", text: "What nutrient runoff actually is" },
      { type: "p", text: "When farmers apply fertilizer, they are adding nitrogen and phosphorus to the soil. Plants need both. Nitrogen drives leaf and stem growth. Phosphorus supports root systems and seed development. Without them, crop yields fall. With them, a field that would naturally produce very little can feed a community." },
      { type: "p", text: "The problem is that plants do not absorb everything applied to them. Uptake efficiency varies by crop type, soil condition, timing of application, and rainfall. In many conventional farming systems, a significant portion of applied nitrogen, sometimes as much as 50 percent, never reaches the plant. It stays in the soil, waiting." },
      { type: "p", text: "Then it rains." },
      { type: "p", text: "Water moving across the soil surface picks up what the plants left behind. Nitrogen and phosphorus travel with that water into drainage channels, streams, rivers, and eventually into lakes, estuaries, or coastal waters. That movement is nutrient runoff. It is not a malfunction. It is what happens when fertilizer meets hydrology." },
      { type: "h2", text: "The chain reaction underground and downstream" },
      { type: "p", text: "Once excess nitrogen and phosphorus enter a water body, they do not disappear. They find a use. Algae, which exist naturally in most freshwater and coastal systems, respond to nutrient influx by blooming rapidly. An algal bloom is exactly what it sounds like: an explosive increase in algae population driven by sudden nutrient availability." },
      { type: "p", text: "In the short term, a bloom turns water green. In the medium term, the algae begin to block sunlight from reaching underwater plants and the deeper water column. Those plants die. Aquatic insects, invertebrates, and small fish that depend on them begin to disappear." },
      { type: "p", text: "Then the bloom itself dies." },
      { type: "p", text: "Dead algae decompose. Decomposition is done by bacteria, and bacteria consume oxygen as they work. In a water body already stressed by a dense algal bloom, that bacterial decomposition can strip dissolved oxygen from the water column to levels too low to support fish and most aquatic life. The technical term for this is hypoxia. The informal term is a dead zone." },
      { type: "quote", text: "Fertilizer was designed to sustain life. Under the wrong conditions, it ends it." },
      { type: "p", text: "This is not a theoretical concern. The Gulf of Mexico dead zone, fed largely by agricultural runoff from the Mississippi River Basin, has been recorded as one of the largest hypoxic zones in the world, covering thousands of square kilometres in peak years. Similar dead zones have been documented in the Baltic Sea, the Chesapeake Bay, and along numerous river systems across sub-Saharan Africa and South Asia where agricultural intensification has accelerated without corresponding runoff management." },
      { type: "h2", text: "Why this problem is so difficult to solve" },
      { type: "p", text: "Nutrient runoff is what environmental scientists call a nonpoint source pollution problem. Unlike a pipe discharging waste from a factory, there is no single identifiable source to regulate or shut down. The pollution originates across millions of fields, applied by millions of farmers, in amounts and timings that vary by season, crop type, and individual practice." },
      { type: "p", text: "That makes both regulation and remediation genuinely hard." },
      { type: "p", text: "Regulation requires either monitoring every farm, which is logistically impossible at scale, or setting blanket limits on fertilizer application, which risks reducing yields for farmers who are already managing margins carefully. In developing agricultural economies, where smallholder farmers depend entirely on their yields for income and food security, restricting fertilizer access without viable alternatives is not a straightforward policy choice." },
      { type: "p", text: "Remediation is also limited. Once nitrogen and phosphorus are in a river system, removing them is expensive and technically demanding. Constructed wetlands, riparian buffer zones planted along waterways, and controlled drainage systems can intercept a portion of nutrient laden runoff before it reaches major water bodies, but none of these are silver bullets." },
      { type: "h2", text: "What farmers and policymakers are actually doing" },
      { type: "p", text: "The most effective interventions target the source rather than the pathway. Precision agriculture approaches, which use soil testing, variable rate fertilizer application, and timing adjustments based on crop growth stage and weather forecasting, can substantially reduce fertilizer waste without sacrificing yield. Research in Iowa, one of the most intensively farmed regions in the United States, has shown that precision nitrogen management can cut losses by 30 to 40 percent in some cropping systems." },
      { type: "p", text: "Cover cropping is another tool gaining traction. Planting a secondary crop during the off season, typically a legume or grass species, keeps plant roots in the soil during periods when the main crop is absent. Those roots take up residual soil nitrogen that would otherwise be available for runoff during winter and spring rains. The cover crop is then tilled in before the main planting season, returning that captured nitrogen to the soil in a form the next crop can use." },
      { type: "p", text: "In sub-Saharan Africa and parts of Asia, where synthetic fertilizer is expensive and often inaccessible, the more pressing challenge is not reducing inputs but increasing the efficiency of whatever inputs smallholders can access. Micro dosing techniques, which apply very small amounts of fertilizer directly at the planting hole rather than broadcasting across a field, can triple or quadruple uptake efficiency compared to traditional broadcast methods while using a fraction of the fertilizer." },
      { type: "h2", text: "The bigger picture" },
      { type: "p", text: "The nutrient runoff environmental impact extends beyond dead zones and algal blooms. Nitrates leaching into groundwater supplies create serious drinking water risks. In high concentrations, nitrates cause a condition in infants known as methemoglobinemia, where the blood loses its ability to carry oxygen. Communities dependent on shallow wells in agricultural regions face this risk directly." },
      { type: "p", text: "There is also a climate dimension. Nitrogen lost from agricultural soils does not only end up in water. Some of it converts to nitrous oxide, a greenhouse gas with a warming potential roughly 300 times that of carbon dioxide over a 100 year timeframe. Agricultural nitrous oxide emissions represent a meaningful portion of total global greenhouse gas output, a fact that rarely features in mainstream climate discussions focused on fossil fuels." },
      { type: "p", text: "What we design matters less than how we manage it. That is the honest conclusion that nutrient runoff forces on agriculture. The inputs that have enabled modern food production to feed billions of people are the same inputs that, mismanaged, degrade the water systems those same people depend on." },
      { type: "p", text: "That tension does not resolve neatly. It requires better science, better policy, and a willingness to treat agricultural pollution with the same seriousness as industrial pollution, even when it is harder to see, harder to trace, and harder to fix." },
    ],
  },
  {
    slug: "ai-will-not-replace-writers",
    title: "Why Artificial Intelligence Will Not Replace Human Writers",
    dek: "An editorial on AI tools and human creativity in content production.",
    category: "Editorial",
    wordCount: 273,
    year: "2025",
    featured: true,
    excerpt:
      "AI writing tools draft, summarise, and fill in blanks faster than any human. Speed is not the same thing as capability, and producing text is not the same thing as doing the work of writing.",
    body: [
      { type: "p", text: "Every generation or so, the writing industry convinces itself that something new is about to make writers redundant. Desktop publishing was going to do it. Blogging was going to do it. Now it is artificial intelligence, and once again, the prediction is wrong, though not quite for the reasons most people give." },
      { type: "p", text: "AI writing tools are genuinely impressive. They draft, summarise, rephrase, and fill in blanks faster than any human. Used well, they reduce friction and free up time. But speed is not the same thing as capability, and producing text is not the same thing as doing the work of writing." },
      { type: "quote", text: "AI produces confident sounding text. It does not produce accountable text." },
      { type: "p", text: "The part of writing that AI cannot replicate is judgment: knowing what angle makes a story land, which expert is actually reliable, when the obvious take is wrong, and what a specific audience needs to hear right now. That kind of knowledge is built from experience, not from pattern matching on a training dataset." },
      { type: "p", text: "There is also the question of accountability. When a publication runs something inaccurate, someone has to answer for it. AI systems produce confident sounding errors with no awareness that they have done so. In journalism, education, and professional publishing, that gap between confident and accountable matters enormously." },
      { type: "p", text: "None of this means writers can ignore what is happening around them. The most effective content professionals over the next decade will be those who understand what AI is good at and stay firmly in charge of everything it is not. That is not a threat to writers. It is a description of exactly what good writers already do." },
    ],
  },
  {
    slug: "scientific-communication",
    title: "The Importance of Scientific Communication",
    dek: "On the gap between discovery and impact, and the writers who close it.",
    category: "Science",
    wordCount: 274,
    year: "2025",
    featured: true,
    excerpt:
      "Somewhere in a research centre in northern Nigeria, an agronomist has spent three years developing a cassava variety that resists mosaic virus. If no one explains it in language farmers can act on, none of it will change anything.",
    body: [
      { type: "p", text: "Somewhere in a research centre in northern Nigeria, an agronomist has spent three years developing a cassava variety that resists mosaic virus, the disease that devastates crops across large parts of the country every season. The science is sound. The peer review is done. And if no one explains it in language farmers can understand and act on, none of it will change anything." },
      { type: "p", text: "That gap, between what researchers discover and what reaches the people who need it, is where scientific communication does its work. It is not a soft skill or a secondary concern. It is the mechanism by which science becomes useful." },
      { type: "quote", text: "Accuracy is not the ceiling in science writing. It is the floor." },
      { type: "p", text: "Good science writing does not simplify by removing important details. It simplifies by removing unnecessary ones. That distinction matters. A piece that strips out nuance to make a headline cleaner is not science communication, it is misinformation with a credible source attached." },
      { type: "p", text: "The challenge is real. Research papers are written for other researchers: dense with methodology, hedged with qualifications, structured around conventions that outside readers find impenetrable. Translating that work into something a policymaker will act on, or a smallholder farmer will apply, requires scientific literacy, editorial judgment, and a genuine understanding of the audience." },
      { type: "p", text: "The issues that will define the next several decades, climate change, food security, antimicrobial resistance, emerging disease, are all scientifically complex and politically contested. Each of them needs writers who can engage the public without condescension and hold the line on accuracy when the pressure is to simplify further. Writers who can do that are not support staff for researchers. They are essential." },
    ],
  },
  {
    slug: "darth-vader",
    title: "Why Darth Vader Is Still One of Fiction's Greatest Tragic Villains",
    dek: "On Anakin Skywalker, the cost of devotion, and what great antagonists actually require.",
    category: "Entertainment",
    wordCount: 289,
    year: "2025",
    featured: false,
    excerpt:
      "The best villains do not exist to be defeated. They exist to be understood. Vader works because his fall is earned, and his redemption does not erase what he did.",
    body: [
      { type: "p", text: "If you grew up watching Star Wars, Darth Vader was the villain before he was anything else. The breathing. The cape. The voice that made every scene feel like a verdict being delivered. He worked as a villain because he was total: no hesitation, no visible conflict, just dark authority moving through the galaxy." },
      { type: "p", text: "Then the prequels reframed everything. Suddenly Vader was Anakin Skywalker: a boy with too much power and not enough wisdom, who loved someone so completely that the fear of losing her became the thing that destroyed them both. The fall is not glamorous when you see it from the beginning. It is a slow series of bad choices made by someone who genuinely believed he was choosing right." },
      { type: "quote", text: "The best villains do not exist to be defeated. They exist to be understood." },
      { type: "p", text: "That is what makes Vader work across decades. He is not evil for evil's sake. He is the product of grief, manipulation, and a system, the Jedi Order, that trained him to suppress emotion without teaching him what to do when emotion came for him anyway. The tragedy is structural. It was always going to end this way." },
      { type: "p", text: "Modern storytelling borrows from this constantly and often poorly. A dark backstory is not the same thing as a tragic arc. Vader works because his fall is earned across multiple stories, and his redemption at the end does not erase what he did. It simply closes the loop on what he was before any of it started." },
      { type: "p", text: "What fiction owes Vader is an honest accounting: he is the blueprint for how to build a villain with weight. Not by making him sympathetic in a cheap way, but by making him human in an uncomfortable one." },
    ],
  },
  {
    slug: "fallout-wasteland",
    title: "How Fallout Turned a Wasteland into One of Gaming's Richest Worlds",
    dek: "On lore, environmental storytelling, and why the franchise refuses to let go of its audience.",
    category: "Entertainment",
    wordCount: 289,
    year: "2025",
    featured: false,
    excerpt: "Fallout does not ask you to survive the wasteland. It asks you to understand how it got this way.",
    body: [
      { type: "p", text: "Most post apocalyptic settings are content to be backdrops. Rubble, radiation, danger, the aesthetic does the work and the story fills in around it. Fallout never settled for that. From the original 1997 RPG to the Amazon adaptation in 2024, the franchise has built one of the most internally consistent and politically sharp fictional universes in the medium." },
      { type: "p", text: "The lore runs deep. Pre-war America in the Fallout universe is a retrofuturist nightmare, a 1950s aesthetic that never evolved, where resource scarcity drove the world to nuclear war and corporations like Vault-Tec turned the apocalypse into a business opportunity. That premise is not just flavour. It is the engine that drives every faction, every location, every terminal entry left behind in an abandoned building." },
      { type: "quote", text: "Fallout does not ask you to survive the wasteland. It asks you to understand how it got this way." },
      { type: "p", text: "Environmental storytelling is where the games earn their reputation. A skeleton slumped against a wall tells you something. A refrigerator with food still inside tells you something else. The world communicates constantly, and players who pay attention get a picture of the pre-war world that is more damning than any cutscene could deliver." },
      { type: "p", text: "The factions reinforce this. The Brotherhood of Steel, the Institute, Caesar's Legion, the NCR, none of them are straightforwardly good. Each is a different answer to the same question: what do you rebuild when everything is gone? The franchise trusts its audience to sit with that question without being handed a correct answer." },
      { type: "p", text: "The TV adaptation worked because it understood this. It did not simplify the lore for newcomers. It trusted that the world was interesting enough to pull people in without explanation. That confidence is earned. Fallout spent decades building something worth trusting." },
    ],
  },
  {
    slug: "demon-slayer",
    title: "Why Demon Slayer Still Hits Different",
    dek: "On grief, animation, records, and what happens when a franchise earns every number it posts.",
    category: "Entertainment",
    wordCount: 1035,
    year: "2025",
    featured: false,
    excerpt: "Numbers do not usually tell you why something matters. They tell you that it does. Demon Slayer's numbers have reached a point where they demand an explanation.",
    body: [
      { type: "p", text: "Numbers do not usually tell you why something matters. They tell you that it does. And Demon Slayer's numbers have reached a point where they demand some kind of explanation." },
      { type: "p", text: "The manga has sold over 220 million copies worldwide as of mid-2025, making it one of the best selling manga series in history. The Mugen Train film grossed over 500 million dollars globally and broke records in Japan that had stood for decades. The Infinity Castle film, released in 2025, became the highest grossing anime film of all time and the highest grossing Japanese film ever made, earning over 555 million dollars worldwide with a 98 percent approval rating on Rotten Tomatoes and an 8.5 on IMDb. On MyAnimeList it holds an 8.70 score, which for a franchise of this scale and accessibility is genuinely unusual." },
      { type: "p", text: "These are not the numbers of a fad. They are the numbers of something that found a frequency most entertainment can only aim at." },
      { type: "h2", text: "What the fans are actually saying" },
      { type: "p", text: "Scroll through any Demon Slayer thread on Reddit, Twitter, or fan forums after a major release and you notice something. The conversation is not primarily about plot. It is about feeling." },
      { type: "p", text: "Fans talk about the Mugen Train arc the way people talk about films that changed how they understood grief. They talk about Tanjiro's reaction to Rengoku's death not as a story beat but as something they felt sitting in a cinema. They talk about the Infinity Castle film's fight sequences the way sports fans talk about a match where something historic happened, breathlessly, with specific timestamps." },
      { type: "p", text: "That emotional texture is not accidental. It is what the series was built to produce." },
      { type: "h2", text: "The setup that makes everything work" },
      { type: "p", text: "The premise is simple on purpose. Tanjiro Kamado comes home to find his family massacred and his younger sister Nezuko transformed into a demon. Everything that follows is driven by those two facts. He will become strong enough to protect her. He will find a way to turn her back. The goal never changes. The sincerity never wavers." },
      { type: "p", text: "What separates Demon Slayer from dozens of similar setups is that it refuses to complicate Tanjiro. He is not edgy or morally conflicted in the tired shonen way. He does not perform strength while hiding trauma. He cries openly. He apologises to demons before killing them. He asks about people's lives even in the middle of fights, because he wants to understand what led them to become what they are. In a genre full of characters performing toughness, he stands out by being earnest without being naive." },
      { type: "p", text: "Fans respond to that. Not because it is realistic, but because it is consistent. You always know who Tanjiro is. And in a landscape full of antiheroes and morally ambiguous protagonists, there is something genuinely affecting about a character who is simply trying to do right by the people he loves." },
      { type: "h2", text: "What Ufotable did that no one else was doing" },
      { type: "p", text: "The animation studio Ufotable deserves a large part of the credit for what Demon Slayer became. Their approach to action sequences changed what fans expect from animated combat." },
      { type: "p", text: "Before Demon Slayer, most anime action was built around limited animation, key poses, speed lines, and creative camera angles to imply motion rather than render it. Ufotable rendered the motion. The Entertainment District Arc's finale, widely cited by fans as one of the greatest animated sequences in the medium's history, features flame and water and sound design working together in a way that makes the combat feel genuinely physical. The Infinity Castle film extended that to a feature length format and demonstrated that what had worked in episodes could work at cinema scale." },
      { type: "p", text: "This matters to fans because it changes the relationship between action and emotion. When a fight looks hard, when you can see the cost in the movement, the victory means something different than it does when characters blur past each other in a series of flashes. Demon Slayer's animation makes you feel the weight of every battle. That is not a small thing in a genre defined by battles." },
      { type: "h2", text: "The accessibility factor" },
      { type: "p", text: "One thing industry analysts and fan communities both note is how unusually accessible Demon Slayer is for new anime viewers. One Piece has over a thousand episodes. Naruto has hundreds of filler arcs. Bleach requires a significant investment before the story finds its footing. Demon Slayer's complete series can be watched in a weekend." },
      { type: "p", text: "That accessibility has driven a specific kind of fan growth: people who would not normally watch anime watching Demon Slayer and then staying. Western streaming data bears this out. Multiple Demon Slayer arcs have appeared in Netflix's most watched anime lists year after year, with the Hashira Training Arc logging over 14.7 million views in the second half of 2025 alone. The franchise has not just retained its existing audience. It has kept bringing in new ones." },
      { type: "h2", text: "Why the records make sense" },
      { type: "p", text: "It is easy to be sceptical of record breaking numbers. Culture moves in cycles. What dominates one moment often feels embarrassing in retrospect. But Demon Slayer's records have a different feel because they are built on something real." },
      { type: "p", text: "The Infinity Castle film did not open to 70 million dollars in North America because of marketing. It opened that way because fans who had been waiting years to see that story on a cinema screen showed up in force. The 98 percent Rotten Tomatoes rating did not come from critics being generous to anime. It came from a film that delivered what it promised to deliver, visually, emotionally, and narratively." },
      { type: "p", text: "As of July 2025, Demon Slayer has rearranged what people think is possible for an anime franchise outside Japan. It has sold more manga copies per volume than almost anything in the medium's history, averaging 6.52 million copies across 23 volumes. It has produced the highest grossing theatrical anime release ever made. And it has done all of this while remaining, at its core, a story about a boy who refuses to give up on his sister." },
      { type: "quote", text: "Demon Slayer is not subtle about its feelings. That is precisely why it works." },
      { type: "p", text: "The numbers confirm what fans already know. This one hit different. It earned every figure it posted." },
    ],
  },
];

const RECRUITER = {
  label: "Hiring for a role",
  summary:
    "Available immediately for full-time remote customer support or CX work. Comfortable on email and live chat, quick to learn a new ticketing stack, and used to working without a supervisor reading over the reply before it sends.",
  points: [
    "Full-time remote, no relocation needed",
    "Fast and clear on email and live chat",
    "Handles revisions and difficult feedback calmly",
    "Science background, so technical explanations come naturally",
    "Open to a paid trial shift or a sample ticket first",
  ],
};

const CLIENT = {
  label: "Hiring a writer",
  summary:
    "Available for ghostwriting, SEO content, science communication, academic writing, editing, and cleaning up AI-assisted drafts. NDA friendly, and used to working from a brief with no hand holding.",
  points: [
    "Fiction and nonfiction ghostwriting",
    "SEO and web content",
    "Science and technical writing",
    "Editing, proofreading, and AI-draft cleanup",
    "Independent author with five published books to show the process end to end",
  ],
};

window.SITE = {
  PROFILE,
  HOW_I_WORK,
  SKILLS,
  TOOLS,
  EXPERIENCE,
  EDUCATION,
  SERVICES,
  BOOKS,
  SAMPLES,
  RECRUITER,
  CLIENT,
};
