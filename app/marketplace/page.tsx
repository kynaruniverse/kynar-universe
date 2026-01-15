import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

export default function Marketplace() {
  return (
    <main className="min-h-screen bg-home-surface">
      <Navbar />

      {/* Header */}
      <div className="bg-home-base px-4 py-12 text-center">
        <h1 className="text-h1-mob font-bold text-home-text mb-2">Marketplace</h1>
        <p className="text-body font-serif italic text-home-text/80">
          Explore what helps you work and live.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TEST PRODUCT 1 */}
          <ProductCard 
            title="The Daily Focus" 
            category="Tools" 
            price="12" 
            summary="A clear, simple planner to organize your day without the noise."
            image=""
            slug="daily-focus"
          />

          {/* TEST PRODUCT 2 */}
          <ProductCard 
            title="Calm Morning Routine" 
            category="Life" 
            price="8" 
            summary="Guidance for starting your day with intention and quiet energy."
            image=""
            slug="calm-morning"
          />

          {/* TEST PRODUCT 3 */}
          <ProductCard 
            title="Family Meal Planner" 
            category="Home" 
            price="5" 
            summary="Simple templates to make weekly meals easy and stress-free."
            image=""
            slug="meal-planner"
          />

        </div>
      </div>
    </main>
  );
}

