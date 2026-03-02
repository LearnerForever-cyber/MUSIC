// import Image from "next/image"
// import Link from "next/link"
// import { ArrowRight } from "lucide-react"

// const destinations = [
//   {
//     name: "Bali",
//     country: "Indonesia",
//     image: "/images/tours/bali.jpg",
//     tours: 2,
//   },
//   {
//     name: "Paris",
//     country: "France",
//     image: "/images/tours/paris.jpg",
//     tours: 1,
//   },
//   {
//     name: "Maldives",
//     country: "Indian Ocean",
//     image: "/images/tours/maldives.jpg",
//     tours: 1,
//   },
//   {
//     name: "Dubai",
//     country: "UAE",
//     image: "/images/tours/dubai.jpg",
//     tours: 1,
//   },
// ]

// export function DestinationsSection() {
//   return (
//     <section className="py-20 bg-secondary">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="flex flex-col items-center text-center mb-12">
//           <p className="text-sm font-medium uppercase tracking-widest text-accent">
//             Top Destinations
//           </p>
//           <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
//             Where Will You Go Next?
//           </h2>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {destinations.map((dest) => (
//             <Link
//               key={dest.name}
//               href={`/tours?destination=${dest.name}`}
//               className="group relative aspect-[3/4] overflow-hidden rounded-xl"
//             >
//               <Image
//                 src={dest.image}
//                 alt={`${dest.name}, ${dest.country}`}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-5">
//                 <h3 className="font-heading text-xl font-bold text-white">
//                   {dest.name}
//                 </h3>
//                 <p className="text-sm text-sand/80">{dest.country}</p>
//                 <div className="mt-2 flex items-center gap-1 text-xs text-gold">
//                   {dest.tours} {dest.tours === 1 ? "tour" : "tours"} available
//                   <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


