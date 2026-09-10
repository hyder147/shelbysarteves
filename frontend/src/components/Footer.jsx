import { FiInstagram, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-line py-12 pb-8 bg-[url('/imagesForNavbar/footerBackground.jpg')] bg-cover bg-center">
      <div className="wrap">
        <div className="flex justify-between flex-wrap gap-10 mb-7">
          <div>
            <div className="font-display font-semibold text-[17px] flex items-center gap-2 mb-2">
              <img src="/logo.png" width="24" height="24" alt="Shelby's Arteves" className="rounded-full block object-cover shrink-0" />
              Shelby's Arteves
            </div>
            <p className="text-muted text-[14px] m-0 max-w-[240px]">AI coverage for local service businesses.</p>
            <div className="flex gap-2.5 mt-3.5">
              <a
                href="https://instagram.com/shelbysarteves"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full border border-line text-ink transition-all duration-150 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-0.5"
              >
                <FiInstagram size={17} />
              </a>
              <a 
                href="mailto:shelbysarteves@gmail.com" 
                aria-label="Email"
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full border border-line text-ink transition-all duration-150 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-0.5"
              >
                <FiMail size={17} />
              </a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[12px] text-muted mb-2.5">Platform</div>
            <a href="#services" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">Services</a>
            <a href="#how" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">How it works</a>
            <a href="#industries" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">Industries</a>
          </div>
          <div>
            <div className="font-mono text-[12px] text-muted mb-2.5">Company</div>
            <a href="#contact" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">Contact</a>
            <a href="mailto:shelbysarteves@gmail.com" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">shelbysarteves@gmail.com</a>
          </div>
          <div>
            <div className="font-mono text-[12px] text-muted mb-2.5">Legal</div>
            <a href="/privacy.html" className="block no-underline text-ink text-[14px] mb-2 hover:text-primary">Privacy Policy</a>
          </div>
        </div>
        
        <div className="font-mono text-[12px] text-[#8B8676] border-t border-line pt-5 mb-2">
          Confirm shelbysarteves@gmail.com is correct before this site goes live.
        </div>
        <div className="font-mono text-[12px] text-[#8B8676]">
          We only offer the services listed above. We don't collect, scrape, or resell data
          from Google Maps or anywhere else — the only data we store is what you submit
          through the contact form. See our <a href="/privacy.html" className="text-inherit hover:text-primary">Privacy Policy</a>.
        </div>
      </div>
    </footer>
  );
}
