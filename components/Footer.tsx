import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-28 pt-10 text-[14.5px] text-[#B7A9E0] md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3.5">
        <p>
          <strong className="text-white">{site.name}</strong> · Paulínia, SP
        </p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white transition hover:text-[#C9BCF5]"
        >
          {site.instagramHandle}
        </a>
      </div>
    </footer>
  );
}
