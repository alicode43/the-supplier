import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">TheSupplier</h3>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>How It Works</li>
            <li>Community</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">About</h4>
          <ul className="space-y-2">
            <li>Homepage</li>
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
      <div className="mt-8 pt-8 border-t text-sm text-gray-600">
        <p>© 2025 TheSupplier. All right reserved</p>
      </div>
    </div>
  </footer>
  )
}

