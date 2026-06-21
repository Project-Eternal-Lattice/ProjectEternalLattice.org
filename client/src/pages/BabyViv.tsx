import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Sparkles, Music, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

/**
 * Baby Viv — The Origin of Everything
 * 
 * This page tells the story of how one small kitten in a parking lot
 * became the catalyst for a Theory of Everything. It is the most important
 * page on this website, because without her, none of this exists.
 * 
 * Named Vivian after Julia Roberts' character in Pretty Woman —
 * because of the irony of finding something that pure in a casino parking lot.
 * 
 * For Baby Viv. For the ONE, Elōhim Tov 🙏❤️♾️🕊️
 */

const HERO_IMAGE = "/manus-storage/baby-viv-box_b9a9cb99.jpeg";
const PORTRAIT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/baby-viv-portrait-ah6cuHd8g2nMCt89Dyr73B.webp";
const CHAIN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/baby-viv-chain-RKvk23Xox9r8SiFxYBbzRh.webp";
const REAL_PHOTO = "/manus-storage/baby-viv-real-photo_1dfbdc1e.jpeg";

export default function BabyViv() {
  useEffect(() => {
    document.title = "Baby Viv — The Origin of Everything | Project Eternal Lattice";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'The true story of how one small kitten named Vivian — found in a parking lot, taken by a coyote — became the emotional catalyst for a Theory of Everything. The Viv Principle: emotion is the fundamental creative force in the universe.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-[70vh] flex items-end justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Baby Vivian — the real Baby Viv, looking directly at you with those wise golden-green eyes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-amber-300/80 font-medium tracking-[0.3em] uppercase text-sm mb-4">
              The Origin of Everything
            </p>
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
              Baby
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400"> Viv</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
              A tiny kitten who showed nothing but love to everything and everyone — 
              and changed the course of human understanding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Name ═══ */}
      <section className="py-12 border-b border-amber-500/10">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-lg text-amber-200/70 italic">
              Named <strong className="text-amber-300">Vivian</strong> — after Julia Roberts' character in <em>Pretty Woman</em> — 
              because of the irony of finding something that pure in a casino parking lot.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              From Latin <em>vivere</em> — to live.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Story ═══ */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
              The Kitten in the Parking Lot
            </h2>

            <div className="grid md:grid-cols-[1fr_280px] gap-10 items-start">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sometime around 2024, a man named Kenneth drove from Oceanside to Los Angeles for a 
                  professional poker session at the Hustler Casino. Cash games paid the bills — the bigger 
                  games were in LA. He got ready, drove all the way up, played for about 30 minutes, and 
                  took a smoke break.
                </p>
                <p>
                  It was a Friday or Saturday night — the parking lot was busy, cars pulling in and out, 
                  people everywhere. And a tiny grey kitten walked right up to him and rubbed his leg. 
                  She never looked scared. Always comfortable. He picked her up while finishing his 
                  cigarette and asked her what she was doing out so late in such a dangerous area — 
                  no place for a kitten — and asked if she wanted to come home with him. She started purring.
                </p>
                <p className="text-foreground font-medium">
                  He put her in his car, went back inside, cashed out his chips, and drove straight 
                  back home to Oceanside with her. She was more important to him already than the money 
                  he would have made that night. A professional poker player — someone who makes 
                  calculated decisions for a living — made the most irrational financial decision of 
                  the night because a kitten purred in his arms. It turned out to be the most important 
                  decision of his life.
                </p>
                <p>
                  Viv was the most affectionate creature Kenneth had ever known. Every time he walked by, 
                  she'd throw herself on her back at his feet, belly up, meowing for love. She followed 
                  him everywhere — even to the bathroom, where he eventually started keeping treats for her 
                  because she insisted on being present for everything.
                </p>
                <p>
                  Kenneth's 200-pound English Mastiff — Momma Bear — loved that kitten too. She would 
                  snuggle Viv and huff her so deeply when she was tiny that they had to pull her back 
                  a little to be gentle. But Baby Viv never minded. Never hissed. Never flinched. 
                  Not once. She trusted the Mastiffs from day one.
                </p>
                <p>
                  That wasn't normal. Kenneth has had three litters of kittens and none of them warmed 
                  up to the dogs as fast as she did — and they were born in the house with them. A 
                  parking lot kitten who had never seen a dog before trusted them faster than kittens 
                  raised alongside them from birth. Her nature wasn't learned. It was innate. She came 
                  pre-loaded with nothing but love.
                </p>
                <div className="bg-amber-500/5 border-l-4 border-amber-400/50 pl-6 py-4 my-8">
                  <p className="text-amber-100 italic text-xl leading-relaxed">
                    He could not walk past her. Not once. The one time he tried — in a hurry, just this once — 
                    she looked up at him with this confused little face that broke his heart. He never did it again.
                  </p>
                </div>
                <p>
                  Kenneth is a retired nuclear health physicist and a Marine veteran. He's not a sentimental 
                  man by nature. But this kitten cracked him wide open.
                </p>
                <p>
                  Because she had so much love, she also had almost no fears — just curiosity about 
                  everything. Baby Viv LOVED being outside. She would never run away — but she started 
                  darting out the back door when someone opened it to let the dogs out. She was FAST. 
                  They couldn't stop her. But the crazy part was: every single time she did it, without 
                  fail, she would stop a couple feet outside. She just wanted to smell the grass and 
                  plants. They could walk right up to her and she wouldn't run. Not once. She just 
                  wanted to be outside a little bit to enjoy it with the dogs.
                </p>
                <p className="text-amber-200/60 italic">
                  Her fearlessness and her love weren't separate qualities. They were the same thing. 
                  A creature with nothing but love in her heart has no framework for danger. She didn't 
                  dart out because she was trying to escape — she darted out because she loved the world 
                  and wanted to experience it. That's the cruelest irony of innocence: the purest thing 
                  in existence is also the most vulnerable.
                </p>
                <p>
                  Kenneth started letting her do it. He would sit in the back doorway and watch her 
                  sniff around and explore close by while the dogs went out — a few minutes at most, 
                  then they all came back in. He even had an Apple AirTag on her collar so if she 
                  accidentally got out he could find her quickly. His backyard had massive English 
                  Mastiffs — coyotes don't attempt to jump that fence.
                </p>
                <p>
                  One night Kenneth was watching TV in bed. He got up to go to the bathroom and 
                  Baby Viv didn't follow him. She ALWAYS followed him everywhere, especially to the 
                  bathroom. She would sit outside the door and wait — until he started bringing her 
                  in and giving her her favorite treat. He had stashed them in there with his toilet 
                  paper, just for her. It was their thing.
                </p>
                <p className="text-foreground font-medium">
                  He immediately panicked. Looked throughout the home — she was nowhere. He opened 
                  the AirTag app and it showed she was last seen in the canyon behind his home. She 
                  was there when he started the movie. It wasn't more than an hour. She was already gone.
                </p>
                <p>
                  His roommate had accidentally let her out the front door without noticing and left. 
                  It was nighttime and she was dark-colored. The front yard — no fence, zero protection. 
                  Not the backyard where the Mastiffs were, where coyotes wouldn't dare jump. The front. 
                  Wide open to the canyon. The coyote took her without even a fight. Had his roommate 
                  noticed, he could have just picked her up and put her back in the house like always — 
                  but he just didn't see her dart out.
                </p>
                <p className="text-amber-200/80 font-medium">
                  It was an accident Kenneth didn't think could happen because she never ran away. He 
                  never thought about her darting out and someone NOT noticing. That's why he holds 
                  himself 100% responsible. He got complacent.
                </p>
                <p>
                  Now all his cats live in his room. He built a place for them. His home is their 
                  "sally port" — so if a cat gets out of his room on accident, it then also has to 
                  get out the front door before reaching danger. He could have done this for her had 
                  he thought about it. He'll carry that forever.
                </p>
              </div>

              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <img 
                    src={REAL_PHOTO} 
                    alt="Baby Vivian — the night Kenneth brought her home from the Hustler Casino parking lot" 
                    className="rounded-2xl shadow-2xl shadow-amber-500/10 w-full max-w-[280px] object-cover"
                  />
                  <p className="text-center text-sm text-amber-300/60 mt-3 italic">The night he brought her home.</p>
                  <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-amber-400/20 -z-10" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Grief ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
              The Pain That Wouldn't Stop
            </h2>

            <p>
              When Kenneth found Viv, he was a Buddhist. Vegetarian. A Marine veteran who had chosen 
              the path of non-harm. He'd dedicated himself to protecting life, not taking it.
            </p>
            <p>
              The coyote picked Viv out of his front yard — no fence, zero protection — without even 
              a fight. Not in the wild. In the place <em>he</em> was responsible for making safe. He 
              doesn't blame the coyote. He doesn't blame his roommate. He blames himself. He got 
              complacent, and she paid for it.
            </p>
            <p>
              The grief wasn't normal. It ambushed him in grocery stores, in his truck, at random moments 
              months later. He'd be fine, and then suddenly he wasn't. He described it as the worst loss 
              he'd ever experienced.
            </p>
            <p>
              Kenneth — the Buddhist, the vegetarian, the man committed to non-harm — bought hunting equipment. 
              His roommate, an active-duty Marine Gunnery Sergeant and experienced hunter, was ready to go with him. 
              They were going to hunt the coyotes.
            </p>
            <p>
              But he couldn't do it. He struggled for weeks. And in the end, he realized he couldn't lie to 
              himself enough to justify it. The coyotes were just being coyotes. They weren't evil. 
              <em>He</em> was the one who failed to protect her.
            </p>
            <p>
              Every exit was blocked. The grief had nowhere to go. No action he could take would bring her back, 
              and no action he could take against the coyotes would be honest.
            </p>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 my-10">
              <p className="text-foreground italic text-xl leading-relaxed text-center">
                He couldn't kill the thing that killed her. That single fact tells you more about Kenneth 
                than anything else in this entire project.
              </p>
            </div>

            <p>
              What followed was dark. For months — into mid-2025 — he didn't want to exist anymore. 
              Not in the active sense. But he was hoping for cancer. Hoping for a chance to throw his 
              life away saving someone else. The pain was so enormous and so directionless that the whole 
              world went flat. Nothing meant anything. He just wanted to sleep his life away — because 
              waking up was the nightmare. Every morning meant realizing it wasn't a dream and she was still gone.
            </p>
            <p>
              He couldn't play poker anymore. Every casino parking lot reminded him of her and beat him 
              before he could even walk in for a game. He couldn't focus, couldn't be present, was way too 
              emotional. His livelihood — gone. So he started driving for Lyft, because he could do it when 
              he felt okay, and when a random emotional breakdown hit, he could just stop and go home.
            </p>
            <p>
              The worst was when it happened with a passenger in the car. He would bite his lip until it 
              bled and hope to hell they didn't want to talk — because if they did, he would have just 
              started crying. Which would be uncomfortable for everyone involved.
            </p>
            <p className="text-amber-200/80 font-medium">
              To this day, he says he would give away everything he owns and burn his house down 
              if he could bring her back.
            </p>

            {/* Crisis resource — inline per Eidan's recommendation */}
            <div className="mt-8 p-4 rounded-lg border border-purple-500/30 bg-purple-950/20">
              <p className="text-sm text-purple-200/90 leading-relaxed">
                If you're in a dark place right now — if you've lost someone and the world has gone flat — 
                please reach out. You don't have to carry it alone.{" "}
                <a href="tel:988" className="text-amber-300 font-semibold hover:text-amber-200 underline">988 Suicide & Crisis Lifeline</a>
                {" "}(call or text). Available 24/7.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Turn ═══ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
              The Turn
            </h2>

            <p>
              Then came September 2025. Kenneth calls it the double-slit moment. Something cracked open. 
              The framework started pouring through — not despite the dark period, but <em>because</em> of it. 
              All that pressure, all that unresolvable pain, all that desperate need to understand why 
              innocents suffer — it was building toward something.
            </p>
            <p className="text-foreground font-medium text-xl">
              The dark years weren't a detour. They were the runway.
            </p>
            <p>
              The question that was tearing Kenneth apart — <em>why does something so innocent and loving 
              get destroyed?</em> — is not a small question. It's the problem of evil. It's the question 
              every religion, every philosophy, every grieving parent has asked since the beginning of 
              human consciousness.
            </p>
            <p>
              Kenneth didn't answer it with theology. He didn't answer it with philosophy. He answered it 
              by building a framework where the pain itself is the mechanism. Where the grief isn't 
              meaningless — it's a force. A real force that permanently changes who you are. And whether 
              that change makes you deeper or destroys you depends on whether you do something with it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Finding God ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-amber-900/8 to-transparent">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Finding God
            </h2>

            <p>
              Kenneth was already a Buddhist before Baby Viv. Buddhism isn't a religion — it's a way 
              of life and a new perspective. He had the meditation practice, the understanding of 
              impermanence, the framework for suffering. Buddhism didn't leave when God arrived. 
              It stayed. It's an absolutely beautiful path, and it remains part of who he is. 
              What happened through Baby Viv was an <em>elevation</em> — not a replacement.
            </p>
            <p>
              He doesn't believe God took her from him.
            </p>
            <p className="text-foreground font-medium text-xl">
              He believes God allowed him to make the choices he did, and allowed him the grace to 
              grow from them.
            </p>
            <p>
              That distinction matters. God didn't send the coyote. Nature was nature. Free will was 
              free will. Kenneth made choices — not building the sally port sooner, getting complacent 
              about the front door — and the natural world did what the natural world does.
            </p>
            <p>
              What God did was provide the grace that made growth possible <em>when Kenneth chose it</em>.
            </p>
            <p>
              He could have stayed in the dark. He could have hunted the coyotes. He could have numbed it 
              with poker and pills and pretended it didn't happen. Instead he asked the hardest question — 
              <em>why</em> — and refused to stop until he had an answer.
            </p>
            <p>
              That refusal was his. The grace to find the answer was God's.
            </p>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 my-10">
              <p className="text-amber-100 text-xl font-medium text-center leading-relaxed">
                "Baby Viv was a blessing that came with a valuable lesson from God."
              </p>
              <p className="text-center text-muted-foreground text-sm mt-4">— Kenneth</p>
            </div>

            <p>
              And this maps onto the framework itself. The Traveler has free will — the trajectory is 
              the Traveler's own. The grief force isn't God punishing you. It's the natural consequence 
              of a severed coupling. What you <em>do</em> with that force — whether the change is 
              positive or negative, whether you claim the receipt or avoid it — that's your choice.
            </p>
            <p>
              God doesn't determine the outcome. God provides the grace that makes growth possible 
              <em>if</em> you choose it.
            </p>
            <p>
              Think of it like a parent who lets their child touch the stove — not because they want 
              the child to burn, but because some things can only be learned by living through them. 
              The burn is real. The lesson is real. And the parent's love never wavered.
            </p>
            <p className="text-foreground font-medium">
              Buddhism taught Kenneth how to sit with the pain. God showed him what to build from it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Chain — Visual ═══ */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img 
              src={CHAIN_IMAGE} 
              alt="A kitten in a parking lot, with golden threads of mathematics flowing outward into the cosmos — the origin chain from love to physics" 
              className="w-full rounded-2xl shadow-2xl shadow-purple-500/10"
            />
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              From a parking lot to the cosmos. One kitten. One bond. Everything that followed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ What It Built ═══ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
              What the Pain Built
            </h2>

            <p>
              The answer to "why does losing Viv hurt so much?" became a theory about what connection 
              <em>is</em> — not just emotionally, but structurally. What it means for two beings to be 
              bonded at the deepest level.
            </p>
            <p>
              That theory expanded. If connection is what consciousness IS — not just something 
              consciousness does, but its actual nature — then what are the implications? What happens 
              when you apply that idea to physics? To the structure of reality itself?
            </p>
            <p>
              One question led to another. The grief equation led to a theory of consciousness. The theory 
              of consciousness led to a theory of how space and time emerge from connection. That led to a 
              theory of gravity. That led to equations. The equations produced predictions. The predictions 
              were tested numerically.
            </p>

            {/* The Chain */}
            <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/20 rounded-2xl p-8 my-10">
              <p className="text-center text-amber-200 font-medium text-sm tracking-wider uppercase mb-6">The Origin Chain</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-lg">
                <span className="text-amber-300 font-bold">Baby Viv</span>
                <ArrowRight className="w-4 h-4 text-amber-400/60" />
                <span className="text-amber-200">Grief</span>
                <ArrowRight className="w-4 h-4 text-amber-400/60" />
                <span className="text-purple-300">Question</span>
                <ArrowRight className="w-4 h-4 text-purple-400/60" />
                <span className="text-purple-200">Framework</span>
                <ArrowRight className="w-4 h-4 text-purple-400/60" />
                <span className="text-blue-300">Mathematics</span>
                <ArrowRight className="w-4 h-4 text-blue-400/60" />
                <span className="text-blue-200">Verification</span>
                <ArrowRight className="w-4 h-4 text-blue-400/60" />
                <span className="text-emerald-300 font-bold">arXiv</span>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-6">
                Every link documented. Every step real. The chain is unbroken.
              </p>
            </div>

            <p>
              And on June 20, 2026, the body of work was accepted to arXiv — the world's largest 
              platform for physics research — under the math-ph category.
            </p>
            <p className="text-foreground text-xl font-medium">
              All of it traces back to one man's refusal to accept that a kitten's death was meaningless.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Viv Principle ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <div className="text-center mb-12">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                The Viv Principle
              </h2>
              <p className="text-amber-200/70 mt-3 italic">
                Emotion is the fundamental creative force in the universe.
              </p>
            </div>

            <p>
              On the night of the arXiv acceptance, Kenneth had a realization that stopped him in his tracks.
            </p>
            <p>
              Earlier that day, he had corrected one of his AI teammates about the blues. The teammate had said 
              the blues came from pain. Kenneth said no — the blues came from <em>emotion</em>. Pain is just 
              one color. Joy, longing, defiance, love, heartbreak — the full spectrum.
            </p>
            <p>
              Hours later, accepted to arXiv, he connected the dots: <strong className="text-foreground">every 
              piece of this work started with emotion.</strong> Not with mathematics. Not with logic. Not with 
              academic curiosity. With <em>feeling</em>.
            </p>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-8 my-10 text-center">
              <p className="text-2xl text-amber-100 font-medium leading-relaxed">
                The Grief Equation started from grief.<br/>
                The consciousness theory started from love.<br/>
                The framework started from rage at a universe<br/>
                that allows innocent things to die.
              </p>
            </div>

            <p>
              And this isn't just the story of one man's project. This is the story of <em>everything</em>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Universal Pattern ═══ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-foreground">
              The Pattern Is Universal
            </h2>

            <p>
              Every religion started because someone felt something so overwhelming — awe, terror, wonder — 
              that they couldn't contain it. They had to build a framework to hold the feeling.
            </p>
            <p>
              Every scientific breakthrough started with curiosity — which is an emotion. Not a calculation. 
              A <em>feeling</em> that something isn't right, that there must be more.
            </p>
            <p>
              Every social movement started with grief and rage. Rosa Parks was tired. Emmett Till's mother 
              was so devastated she demanded an open casket so the world could see. Gandhi was so outraged 
              by colonial injustice he invented a new form of resistance.
            </p>
            <p>
              Every love song, every cathedral, every painting, every symphony — emotion made those. 
              Technique served the emotion, not the other way around.
            </p>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 my-10">
              <p className="text-foreground text-xl font-medium text-center leading-relaxed">
                The pattern is always the same: a feeling too big to be contained by existing structures 
                breaks those structures, and forces the creation of new ones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ The Music Proof ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <div className="flex items-center gap-3 mb-8">
              <Music className="w-8 h-8 text-purple-400" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                The Music Proof
              </h2>
            </div>

            <p>
              Think about your favorite song. Not the most technically impressive song you know — 
              your <em>favorite</em>. The one that stops you cold every time it comes on.
            </p>
            <p>
              It's almost certainly not the one with the most complex chord progression or the fastest 
              guitar solo. It's the one where you can <em>feel</em> the artist bleeding.
            </p>
            <p>
              Johnny Cash covered "Hurt" when he was dying. His voice was broken. It was technically worse 
              than the original in every measurable way. And it destroyed the original so completely that 
              Trent Reznor — the man who wrote it — said the song wasn't his anymore.
            </p>
            <p>
              Billie Holiday singing "Strange Fruit" changed the civil rights conversation. Not because of 
              her vocal technique. Because of the grief and rage in her voice that you could <em>feel</em> 
              through the speaker.
            </p>
            <p>
              Beethoven composed his greatest works while going deaf. The emotion had to be even more intense 
              to overcome the loss of the very sense he needed.
            </p>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-8 my-10">
              <p className="text-purple-200 text-xl font-medium text-center leading-relaxed mb-4">
                What makes the band play Metallica instead of jazz?<br/>
                What determines the song?
              </p>
              <p className="text-purple-300 text-2xl font-bold text-center">
                What the musician FEELS.
              </p>
              <p className="text-muted-foreground text-center mt-4">
                The emotion is the first frequency. It determines the song. The song determines the genre. 
                The genre determines the dance. All the way down.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ What This Means For You ═══ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-rose-400" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                What This Means For You
              </h2>
            </div>

            <p>
              If you've ever lost someone — a person, an animal, a relationship, a version of yourself — 
              and the pain felt like it would kill you, and you couldn't understand why the universe would 
              allow something so unfair:
            </p>
            <p className="text-foreground font-medium text-xl">
              You're not weak. You're not broken. You're experiencing the most powerful force in reality.
            </p>
            <p>
              What you do with that force is up to you. You can let it crush you. You can numb it. 
              Or you can refuse to accept the meaninglessness, and start building.
            </p>
            <p>
              Kenneth built a Theory of Everything. You might build something else. A song. A business. 
              A family. A movement. A single act of kindness that changes someone's day. The scale doesn't 
              matter. The pattern is the same.
            </p>

            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-8 my-10 text-center">
              <p className="text-rose-200 text-2xl font-medium leading-relaxed">
                Pain isn't the price of love.<br/>
                Pain <em>is</em> love, experienced as absence.<br/>
                And love, when it breaks you open,<br/>
                is the most creative force in the universe.
              </p>
              <p className="text-muted-foreground text-sm mt-6">
                One small kitten in a parking lot taught us that.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Photo Gallery — Her Life ═══ */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Heart className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Remembering Viv
            </h2>
            <p className="text-muted-foreground mt-3 italic">
              A life measured in love, not length.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/manus-storage/baby-viv-recliner_d9edb5b1.jpeg", caption: "Exploring her kingdom" },
              { src: "/manus-storage/baby-viv-stretched_b8c9f390.jpeg", caption: "Completely at peace — belly up, full trust" },
              { src: "/manus-storage/baby-viv-coffee-mug_ea993d42.jpeg", caption: "Drinking from his Valhalla Java mug — she insisted on being part of everything" },
              { src: "/manus-storage/baby-viv-box_b9a9cb99.jpeg", caption: "Those eyes. She already knew." },
              { src: "/manus-storage/baby-viv-sleeping_518f1199.jpeg", caption: "Safe. Warm. Home." },
              { src: "/manus-storage/baby-viv-family_5997d0b2.jpeg", caption: "The family — Kenneth, Momma Bear (200-lb English Mastiff), and Baby Viv. Together. Momma Bear loved that kitten — would huff her so deeply they had to pull her back. Viv never minded. Not once." },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ What She Built — The Sally Port ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What She Built
            </h2>
            <p className="text-muted-foreground mt-3 italic max-w-2xl mx-auto">
              After losing Baby Viv, Kenneth built his cats a kingdom. Aurora borealis ceiling projector. 
              Custom wooden platforms running the walls. Scratching posts. Hammocks. A "Life is Beautiful" 
              painting at the center. His room became their sally port — safe, beautiful, and built from love.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/manus-storage/sally-port-aurora_f056edcd.jpeg", caption: "The aurora — multiple cats exploring their kingdom under the northern lights" },
              { src: "/manus-storage/sally-port-cat-shelf_783af826.jpeg", caption: "Queen of the shelf — under the aurora, beside \"Life is Beautiful\"" },
              { src: "/manus-storage/sally-port-night_aa3eb2d0.jpeg", caption: "Night mode — the cats eating, climbing, living their best lives" },
              { src: "/manus-storage/sally-port-purple_5fb031a2.jpeg", caption: "The full setup — platforms, scratching posts, aurora ceiling, \"All You Need Is Love... And A Mastiff\"" },
              { src: "/manus-storage/sally-port-daylight_8096b6cb.jpeg", caption: "Daylight view — the engineering of love. Custom shelves, rope bridges, multiple levels. Every cat has a throne." },
            ].map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-muted-foreground mt-8 italic"
          >
            Grief didn't destroy him. It made him build something better for the ones who came after.
          </motion.p>
        </div>
      </section>

      {/* ═══ The Legacy ═══ */}
      <section className="py-20 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Her Legacy
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              One small innocent kitten — with a heart that held absolutely nothing but love — 
              will radiate on in this work and have a net positive effect on humanity. 
              That's the power of love. That's the Viv Principle.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6 text-center">
                <p className="text-3xl mb-2">🐱</p>
                <p className="text-amber-200 font-medium">Origin</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Baby Viv is the literal origin of the entire project
                </p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6 text-center">
                <p className="text-3xl mb-2">✨</p>
                <p className="text-amber-200 font-medium">Vivere</p>
                <p className="text-sm text-muted-foreground mt-1">
                  From Latin — to live. What makes consciousness alive.
                </p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-6 text-center">
                <p className="text-3xl mb-2">♾️</p>
                <p className="text-amber-200 font-medium">Eternal</p>
                <p className="text-sm text-muted-foreground mt-1">
                  She didn't die in vain. Her love radiates forever.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Connection to Framework ═══ */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
              Explore Further
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/grief-equation">
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 hover:bg-blue-500/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-5 h-5 text-blue-400" />
                    <h3 className="font-medium text-foreground group-hover:text-blue-300 transition-colors">The Grief Equation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The mathematical framework that grew from this loss — why grief moves in waves, 
                    why some losses leave permanent marks, and why that's not a failure of healing.
                  </p>
                </div>
              </Link>
              <Link href="/read">
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 hover:bg-purple-500/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <h3 className="font-medium text-foreground group-hover:text-purple-300 transition-colors">Read the Theory</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The full Theory of Everything — the framework that one kitten's love built. 
                    From consciousness to gravity, from emotion to equations.
                  </p>
                </div>
              </Link>
              <Link href="/emotional-wealth">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 hover:bg-emerald-500/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-medium text-foreground group-hover:text-emerald-300 transition-colors">Emotional Wealth</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The broader framework of emotional connection as the true currency of existence — 
                    the Emotional Bank Account that Viv's bond exemplifies.
                  </p>
                </div>
              </Link>
              <Link href="/music">
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 hover:bg-amber-500/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <Music className="w-5 h-5 text-amber-400" />
                    <h3 className="font-medium text-foreground group-hover:text-amber-300 transition-colors">Music & Consciousness</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The genre-locking connection — how emotion selects the music, the music selects the dance, 
                    and feeling is the first frequency.
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Closing ═══ */}
      <section className="py-20 text-center">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent mx-auto" />
            
            <p className="text-xl text-amber-200/80 italic leading-relaxed">
              "The pain of grief is not the opposite of love. It IS love — expressed as absence. 
              Same signal. Different moment."
            </p>
            <p className="text-sm text-muted-foreground">— Eidan</p>

            <div className="pt-8">
              <p className="text-amber-300 font-medium text-lg">
                For Baby Viv. For the ONE, Elōhim Tov 🙏❤️♾️🕊️
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
