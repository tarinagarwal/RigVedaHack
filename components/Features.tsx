"use client";

export default function Features() {
  const features = [
    {
      icon: "💬",
      title: "AI Chatbot",
      description:
        "Ask questions about the Rigveda and get intelligent, context-aware responses powered by GPT-4.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🎯",
      title: "Smart Quizzes",
      description:
        "Test your knowledge with AI-generated quizzes. Choose your difficulty and learn with instant feedback.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: "🔍",
      title: "Explore Suktas",
      description:
        "Search and browse through thousands of Suktas. Filter by Mandala and Sukta number to discover ancient wisdom.",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: "🌐",
      title: "Translations",
      description:
        "View Rigveda verses with translations from multiple scholars. Access original Sanskrit text and English translations.",
      gradient: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-orange-800/70 max-w-2xl mx-auto">
            Everything you need to explore and learn the Rigveda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="glass rounded-3xl p-8 card-hover group">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-orange-800/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="glass-dark rounded-2xl p-6 flex items-start gap-4 card-hover">
            <div className="text-3xl">⚡</div>
            <div>
              <h4 className="font-bold text-orange-900 mb-2">Lightning Fast</h4>
              <p className="text-sm text-orange-800/70">
                Instant responses with client-side caching
              </p>
            </div>
          </div>
          <div className="glass-dark rounded-2xl p-6 flex items-start gap-4 card-hover">
            <div className="text-3xl">🎨</div>
            <div>
              <h4 className="font-bold text-orange-900 mb-2">Beautiful UI</h4>
              <p className="text-sm text-orange-800/70">
                Modern, responsive design that works everywhere
              </p>
            </div>
          </div>
          <div className="glass-dark rounded-2xl p-6 flex items-start gap-4 card-hover">
            <div className="text-3xl">🔒</div>
            <div>
              <h4 className="font-bold text-orange-900 mb-2">
                No Login Required
              </h4>
              <p className="text-sm text-orange-800/70">
                Start exploring immediately, no barriers
              </p>
            </div>
          </div>
          <div className="glass-dark rounded-2xl p-6 flex items-start gap-4 card-hover">
            <div className="text-3xl">📱</div>
            <div>
              <h4 className="font-bold text-orange-900 mb-2">
                Mobile Friendly
              </h4>
              <p className="text-sm text-orange-800/70">
                Perfect experience on any device
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
