import authorPic from "../assets/RK.jpg";

export default function IntroBanner() {
  return (
    <section 
      className= "mb-6 flex justify-between gap-4 border-y-2 border-slate-300 rounded-lg text-white py-5 bg-[url('../assets/bg-image.jpg')]"
    >
      <p className="bg-black bg-opacity-50 p-4">
        Néo dev JavaScript et Linuxien convaincu, ce blog est mon carnet de notes partageant mon apprentissage  
        du développement et des astuces autour de Linux !
      </p>
      <img src={authorPic} alt="RK" className="h-24 rounded-xl mr-5 opacity-90"/>
    </section>
  );
}