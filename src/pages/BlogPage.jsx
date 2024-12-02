import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import images
import SaveMoney from '../assets/images/SaveMoney.jpg';
import ReduceEImpact from '../assets/images/ReduceEImpact.jpg';
import Vintage from '../assets/images/Vintage.jpg';
import LocalCommunity from '../assets/images/LocalCommunity.jpg';
import LifeStyle from '../assets/images/lifeStyle.png';

const BlogPage = () => {
  const posts = [
    {
      title: "Save Money Without Sacrificing Quality",
      content:
        "Let’s face it—brand-new items often come with hefty price tags. Secondhand items, however, give you access to high-quality products at a fraction of the cost. Whether it’s furniture, electronics, or clothing, buying pre-loved goods can stretch your budget without compromising on quality.",
      image: SaveMoney,
    },
    {
      title: "Reduce Environmental Impact",
      content:
        "Every item you buy secondhand is one less item that ends up in a landfill. By extending the life of products, you’re helping to reduce waste, save resources, and lower the demand for energy-intensive manufacturing.",
      image: ReduceEImpact,
    },
    {
      title: "Discover Unique and Vintage Finds",
      content:
        "Secondhand shopping is a treasure hunt—you never know what gems you might uncover! From one-of-a-kind vintage clothing to antique furniture with character, secondhand stores are filled with items that add personality to your style or home.",
      image: Vintage,
    },
    {
      title: "Support Local Communities",
      content:
        "Many secondhand stores and online platforms are run by small businesses, charities, or individuals. Your purchase can help support local economies and meaningful causes, making your shopping experience feel even more rewarding.",
      image: LocalCommunity,
    },
    {
      title: "Embrace a Sustainable Lifestyle",
      content:
        "By buying secondhand, you’re joining a movement that prioritizes sustainability and mindful consumption. It’s not just about buying—it’s about making conscious choices that align with an eco-friendlier and more responsible lifestyle.",
      image: LifeStyle,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen font-poppins">
        <header className="text-center py-5">
          <h1 className="text-4xl font-bold text-green-700">5 Reasons to Buy Secondhand</h1>
          <p className="text-green-500">Make sustainable and budget-friendly choices!</p>
        </header>

        <div className="max-w-6xl mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="p-5 bg-green-50 shadow-lg rounded-lg border border-green-200 hover:shadow-xl transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-green-600 mb-2 text-center">{post.title}</h2>
              <p className="text-gray-600 text-center">{post.content}</p>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
