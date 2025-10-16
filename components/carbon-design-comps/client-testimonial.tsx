export default function ClientTestimonial() {
  return (
    <section className="max-w-7xl mx-auto py-12">
      <h2 className="text-3xl md:text-4xl mb-8">Client Testimonial</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-4xl">
          <p className="text-base mb-4">
            We are thrilled partnering with carbon and whale for the benches in
            our mall. These benches provide a comfortable and durable seating
            option for visitors as well as they also represent a significant
            step toward sustainability.
          </p>
          <p className="text-base mb-4">
            The quality of the recycled plastic is impressive resistant to
            weather, color fading, these benches require minimal maintenance
            compared to traditional wooden or metal options.
          </p>
          <p className="text-base mb-6">
            Moreover, knowing that each bench is made from recycled materials
            gives our community a sense of pride. It serves as a constant
            reminder of our commitment to reducing waste and protecting the
            environment. Incorporating recycled plastic benches into our mall
            has not only enhanced the aesthetic appeal but has also fostered a
            greater awareness of sustainability within our community.
          </p>

          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <div>
            <h4 className="font-medium">Monu Nair</h4>
            <p className="text-sm text-gray-500">GM-Oberon Mall</p>
          </div>
        </div>
      </div>
    </section>
  );
}
