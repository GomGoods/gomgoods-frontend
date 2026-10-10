import { HeroSection } from "@/components/home/HeroSection";
import { CategoryNav } from "@/components/home/CategoryNav";
import { RecommendedProducts } from "@/components/home/RecommendedProducts";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-6">
      <HeroSection />
      <CategoryNav />
      <RecommendedProducts />
    </div>
  );
}
