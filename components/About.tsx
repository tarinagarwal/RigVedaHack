"use client";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-5xl font-bold gradient-text mb-8 text-center">
              About Nirvāṇa
            </h2>

            <div className="space-y-6 text-lg text-coral-900/80 leading-relaxed">
              <p>
                The <strong>Rigveda</strong> is one of the oldest sacred texts
                in human history, composed over 3,500 years ago. It contains
                profound wisdom, hymns, and philosophical insights that have
                shaped civilizations.
              </p>

              <p>
                <strong>Nirvāṇa</strong> brings this ancient knowledge into the
                modern age by combining the complete text of all 10 Mandalas
                with cutting-edge artificial intelligence. Our platform makes it
                easy for anyone—students, scholars, or the curious—to explore,
                learn, and engage with these timeless Suktas.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-coral-100 to-coral-100 rounded-2xl p-6">
                  <h3 className="font-bold text-xl mb-3 text-coral-900">
                    🎓 For Students
                  </h3>
                  <p className="text-coral-800/80">
                    Learn interactively with quizzes and AI-powered explanations
                  </p>
                </div>
                <div className="rounded-2xl p-6">
                  <h3 className="font-bold text-xl mb-3 text-coral-900">
                    📚 For Scholars
                  </h3>
                  <p className="text-coral-800/80">
                    Search and analyze Suktas with powerful filtering tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
