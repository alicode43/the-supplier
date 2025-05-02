import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="bg-primary border-t py-12 px-4 text-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">TheSupplier</h3>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 cursor-pointer">
            <li>Blog</li>
            <li>
              <Link
              href="/how-it-work"

              >

              How It Works
              </Link>
              </li>
            <li>Community</li>
            <Link href='/privacy-policy'>
            Privacy Policy
            </Link>
         
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">About</h4>
          <ul className="space-y-2">
            <li>
          
            <Link
              href="/"

              >

             Homepage
              </Link>
                  
            </li>
            <li>Team Profiles</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2">
            <li>Core Services</li>
            <li>Account Tools</li>
            <li>Delivery Policy</li>
            <li>Quotation Guide</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t text-sm md:flex justify-between text-white">
        <p>© 2025 TheSupplier. All right reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
     
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className=" transition-colors">
              <Linkedin size={20} fill="currentColor" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
              <Twitter size={20} fill="currentColor" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors">
              <Facebook size={20} fill="currentColor" />
            </a>
          </div>
      </div>
    </div>
  </footer>
  )
}

