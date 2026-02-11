/**
 * Calculate estimated reading time for content
 * Based on average adult reading speed of 200-250 wpm
 * Using 200 wpm for technical/business content (slower reading)
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  
  // Strip HTML/markdown formatting for accurate word count
  const text = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks (read faster/skip)
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, minutes); // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
