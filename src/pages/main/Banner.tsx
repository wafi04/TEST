import { motion } from "framer-motion";
import image from "../../assets/image.png";
import { ButtonHighlight } from "../../components/ui/button/ButtonHighlight";

export function Banner() {
  return (
    <section className=" h-[700px] bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 flex items-center h-full">
        {/* left content  */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 space-y-6">
          <h1 className="text-6xl font-black uppercase tracking-tight">
            Urban <br />
            <span className="text-red-500">Sneaker</span> Revolution
          </h1>
          <p className="text-lg text-gray-300">
            Cutting-edge design meets unparalleled comfort. Experience the next
            generation of streetwear.
          </p>

          <ButtonHighlight className="border border-white/50 px-8 py-4 rounded-full hover:bg-white/10 transition">
            <a href="/p">View Catalog</a>
          </ButtonHighlight>
        </motion.div>

        {/* right content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1/2 relative">
          <motion.img
            src={image}
            alt="Dynamic Sneaker"
            className="relative z-20"
            initial={{ y: 0 }}
            animate={{
              y: [0, -20, 0], // pindahakan image keatas dan kebawah
              // rotate: [0, 5, -5, 0],  tambahakan rotasi
            }}
            transition={{
              duration: 3,
              repeat: Infinity, // ulangi trus
              ease: "easeInOut", //  smooth transition
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
