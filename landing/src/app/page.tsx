import VideoPlayer from '@/components/VideoPlayer';
import OnOffDemo from '@/components/OnOffDemo';
import CodeSnippet from '@/components/CodeSnippet';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center w-full">

      {/* Blobs — absolute so they scroll with the page */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-[20%] w-72 h-72 bg-purple-300/60 rounded-full blur-3xl" />
        <div className="absolute top-8 right-[15%] w-80 h-64 bg-blue-300/50 rounded-full blur-3xl" />
        <div className="absolute bottom-100 left-[40%] w-64 h-64 bg-pink-300/50 rounded-full blur-3xl" />
      </div>

      {/* Glass overlay — fixed so it covers the full viewport always */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[#DDDDDD]/10 backdrop-blur-[80px] pointer-events-none" />

      {/* Hero */}
      <section className="w-full flex flex-col items-center text-center pt-24 pb-24 px-6">
        <h1
          className="font-signifier text-5xl sm:text-6xl tracking-tight mb-3"
        >
          Just Type
        </h1>
        <p className="text-base text-neutral-500 mb-10">No more typing into nothing</p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Add to Chrome */}
          <a
            href="#"
            className="flex items-center gap-2 bg-neutral-900 text-white text-sm px-5 py-2.5 rounded-full hover:bg-neutral-700 transition-colors"
          >
            <img src="/chrome.svg" alt="Chrome" className="w-4 h-4" />
            Add to Chrome
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/mozhaiskyi/justtype"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors bg-white"
          >
            <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
          </a>

          {/* npm */}
          <a
            href="https://www.npmjs.com/package/@mozhaiskyi/justtype"
            className="flex items-center justify-center h-10 px-3 rounded-full border border-neutral-200 hover:border-neutral-400 transition-colors bg-white"
          >
            <img src="/npm.svg" alt="npm" className="h-4" />
          </a>
        </div>
      </section>

      <div className="w-full max-w-2xl px-6 flex flex-col">

        {/* How does it work? */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-5"
          >
            How does it work?
          </h2>
          <div className="flex flex-col gap-4 text-base text-black leading-relaxed">
            <p>
              There&apos;s a text box on your screen. You start typing. Nothing happens — it wasn&apos;t focused. You reach for the mouse, click, try again.
            </p>
            <p>Sound familiar? Annoying every time.</p>
            <p>
              JustType fixes that. It detects when you&apos;re typing and focuses the right field. Invisible until you need it, then exactly where you want it.
            </p>
          </div>
        </section>

        <hr className="border-neutral-100" />

        {/* Now, try to type */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-3"
          >
            Now, try to type
          </h2>
          <p className="text-base text-black leading-relaxed mb-8">
            It already works on that website. Just start to type using your keyboard. Anything...
          </p>
          <OnOffDemo />
        </section>

        <hr className="border-neutral-100" />

        {/* Shortcuts */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-5"
          >
            But wait — what about shortcuts?
          </h2>
          <div className="flex flex-col gap-4 text-base text-black leading-relaxed mb-8">
            <p>
              Spacebar plays. J and L seek. Route every keystroke to an input and those break.
              <br />
              You can have both.
            </p>
            <p>
              Just Type knows the difference between typing and a shortcut. The moment it&apos;s sure you&apos;re writing something, it finds the most relevant input on the page and puts your words there.
            </p>
          </div>

          <VideoPlayer />

          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-sm text-neutral-500 placeholder:text-neutral-400 outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
          <p className="mt-3 text-xs text-neutral-500 text-center">
            Try to click <strong>Spacebar, J, K, L...</strong> Than, start to type comment
          </p>
        </section>

        <hr className="border-neutral-100" />

        {/* For developers */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-5"
          >
            For developers
          </h2>
          <p className="text-base text-black leading-relaxed mb-6">
            Anyone with the{' '}
            <a href="#" className="underline underline-offset-2">Chrome extension</a>{' '}
            gets it automatically on every site. But if you want it built into your site for all visitors — no extension required — it&apos;s one line of code.
          </p>

          <CodeSnippet language="bash" code="npm install @mozhaiskyi/justtype" />

          <p className="text-base text-black leading-relaxed mt-6 mb-4">
            Or drop in a classic CDN script tag.
          </p>

          <CodeSnippet
            language="html"
            code={`<script src="https://cdn.jsdelivr.net/npm/@mozhaiskyi/justtype"></script>`}
          />
        </section>

        <hr className="border-neutral-100" />

        {/* Thanksgiving */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-5"
          >
            Thanksgiving
          </h2>
          <p className="text-base text-black leading-relaxed">
            Tool idea is inspired by{' '}
            <a href="#" className="underline underline-offset-2">this insight from Tiago</a>
            : wait 150ms after the first keypress. If a second printable character arrives within that window, it&apos;s almost certainly typing — not a shortcut. Focus the field and replay everything buffered so far. The delay is imperceptible to humans but large enough to distinguish intent.
          </p>
        </section>

        <hr className="border-neutral-100" />

        {/* FAQ */}
        <section className="py-16">
          <h2
            className="font-signifier text-2xl mb-10"
          >
            FAQ
          </h2>

          <div className="flex flex-col gap-10">
            <div>
              <h3
                className="font-signifier text-lg mb-3"
              >
                Is Just Type safe to use?
              </h3>
              <p className="text-base text-black leading-relaxed">
                Just Type runs entirely in your browser. It does not read, store, or transmit what you type — it only detects that a key was pressed, then routes focus to the right input field. No keylogging. No network requests. No data ever leaves your device.
              </p>
            </div>

            <div>
              <h3
                className="font-signifier text-lg mb-3"
              >
                Is it free?
              </h3>
              <p className="text-base text-black leading-relaxed">
                Just Type is free to install and use. No subscription, no account required. If it saves you time and you&apos;d like to support development, there&apos;s a &ldquo;Buy me a coffee&rdquo; option — but it&apos;s entirely optional.
              </p>
            </div>

            <div>
              <h3
                className="font-signifier text-lg mb-3"
              >
                Will it type into password fields?
              </h3>
              <p className="text-base text-black leading-relaxed">
                No. Password fields are explicitly excluded. JustType will never target a <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded font-mono">type=&quot;password&quot;</code> input, even if it&apos;s the only one on the page.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full py-10 flex justify-center border-t border-neutral-100">
        <p className="text-xs text-neutral-400">
          Made by Mykhailo Mozhaiskyi, 2026 Berlin
        </p>
      </footer>

    </main>
  );
}
