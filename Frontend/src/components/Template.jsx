import { useSelector } from "react-redux";

export default function Template() {
  const data = useSelector((state) => state.resume);

  if (!data.name) return <p className="text-center mt-10">Fill the form to see your resume.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-2">{data.name || "Your Name"}</h1>
        <p className="text-2xl text-muted-foreground">{data.role || "Your Role"}</p>
      </section>

      {/* Contact Info */}
      <section className="mb-10">
        <p>Email: {data.email || "-"}</p>
        <p>Phone: {data.phone || "-"}</p>
        <p>Location: {data.location || "-"}</p>
      </section>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>{data.summary || "-"}</p>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Technical Skills</h2>
        <p>{data.technical_skills || "-"}</p>
      </section>
    </div>
  );
}
