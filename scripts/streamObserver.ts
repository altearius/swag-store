// From:
// https://nextjs.org/docs/app/guides/streaming#verifying-that-streaming-works

// This is used to test whether streaming is working correctly.
//
// Invoke as:
//
// yarn workspace scripts node ./streamObserver.ts

const res = await fetch('http://localhost:3000/', {
	headers: { 'Accept-Encoding': 'identity' },
});

const reader = res.body?.getReader();
if (!reader) {
	throw new Error('No body');
}

const decoder = new TextDecoder();
let i = 0;
const start = Date.now();

while (true) {
	const { done, value } = await reader.read();
	if (done) {
		break;
	}

	console.log(`\nchunk ${i++} (+${Date.now() - start}ms)\n`);
	console.log(decoder.decode(value));
}
