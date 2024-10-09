import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <Link
        href="/create-election"
        className="bg-primary-600 shadow-md p-4 mb-4 rounded-xl w-full block overflow-hidden text-white"
      >
        Create Election
      </Link>
    </>
  );
}
