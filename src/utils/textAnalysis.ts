// Stop words to filter out common words
const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
  "to", "was", "will", "with", "the", "this", "but", "they", "have",
  "had", "what", "when", "where", "who", "which", "why", "how",
]);

// Positive and negative words for sentiment analysis
const positiveWords = new Set([
  "good", "great", "excellent", "amazing", "wonderful", "fantastic",
  "love", "best", "beautiful", "perfect", "happy", "joy", "success",
  "brilliant", "awesome", "terrific", "outstanding", "superb",
]);

const negativeWords = new Set([
  "bad", "terrible", "awful", "horrible", "worst", "hate", "poor",
  "disappointing", "sad", "angry", "fail", "failure", "wrong",
  "negative", "unfortunate", "disappointing", "useless",
]);

export const analyzeText = (text: string) => {
  // Basic counts
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  
  // Word analysis
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0);
  
  const wordCount = words.length;
  
  // Sentence analysis
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;
  
  // Paragraph analysis
  const paragraphs = text
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length;
  
  // Average calculations
  const avgWordLength = wordCount > 0
    ? (charCountNoSpaces / wordCount).toFixed(1)
    : "0";
  
  const avgSentenceLength = sentenceCount > 0
    ? (wordCount / sentenceCount).toFixed(1)
    : "0";
  
  // Time estimates
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  const speakingTime = Math.ceil(wordCount / 130); // 130 words per minute
  
  // Word frequency analysis (excluding stop words)
  const wordFreq: { [key: string]: number } = {};
  words.forEach((word) => {
    if (!stopWords.has(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  const wordFrequency = Object.entries(wordFreq)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / wordCount) * 100).toFixed(2),
    }))
    .sort((a, b) => b.count - a.count);
  
  const uniqueWordCount = Object.keys(wordFreq).length;
  
  // Readability analysis (Flesch Reading Ease)
  const syllableCount = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);
  
  const fleschScore = sentenceCount > 0 && wordCount > 0
    ? Math.round(
        206.835 -
          1.015 * (wordCount / sentenceCount) -
          84.6 * (syllableCount / wordCount)
      )
    : 0;
  
  const gradeLevel = sentenceCount > 0 && wordCount > 0
    ? Math.round(
        0.39 * (wordCount / sentenceCount) +
          11.8 * (syllableCount / wordCount) -
          15.59
      )
    : 0;
  
  // Complex words (3+ syllables)
  const complexWords = words.filter((word) => countSyllables(word) >= 3).length;
  
  // Word errors detection
  const wordErrors = detectWordErrors(words);
  
  // Sentiment analysis
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach((word) => {
    if (positiveWords.has(word)) positiveCount++;
    if (negativeWords.has(word)) negativeCount++;
  });
  
  const sentimentScore = positiveCount - negativeCount;
  const totalSentimentWords = positiveCount + negativeCount;
  
  const positive = totalSentimentWords > 0
    ? Math.round((positiveCount / totalSentimentWords) * 100)
    : 33;
  const negative = totalSentimentWords > 0
    ? Math.round((negativeCount / totalSentimentWords) * 100)
    : 33;
  const neutral = 100 - positive - negative;
  
  let sentimentLabel = "Neutral";
  if (sentimentScore > 2) sentimentLabel = "Positive";
  else if (sentimentScore < -2) sentimentLabel = "Negative";
  
  return {
    wordCount,
    charCount,
    charCountNoSpaces,
    sentenceCount,
    paragraphCount,
    avgWordLength,
    avgSentenceLength,
    readingTime,
    speakingTime,
    wordFrequency,
    uniqueWordCount,
    readability: {
      score: Math.max(0, Math.min(100, fleschScore)),
      gradeLevel: Math.max(1, gradeLevel),
      complexWords,
      wordErrors: wordErrors.count,
      errorWords: wordErrors.errors,
    },
    sentiment: {
      score: sentimentScore,
      label: sentimentLabel,
      positive,
      neutral,
      negative,
    },
  };
};

// Helper function to count syllables in a word
const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

// Helper function to detect word errors
const detectWordErrors = (words: string[]): { count: number; errors: string[] } => {
  const errors: string[] = [];
  
  words.forEach((word) => {
    // Check for repeated characters (3+ times)
    if (/(.)\1{2,}/.test(word)) {
      errors.push(word);
      return;
    }
    
    // Check for all caps words (potential shouting/errors)
    if (word.length > 3 && word === word.toUpperCase() && /[A-Z]/.test(word)) {
      errors.push(word);
      return;
    }
    
    // Check for mixed case errors (liKe tHis)
    const upperCount = (word.match(/[A-Z]/g) || []).length;
    const lowerCount = (word.match(/[a-z]/g) || []).length;
    if (upperCount > 0 && lowerCount > 0 && upperCount < word.length && lowerCount < word.length) {
      if (upperCount > 1 && word[0] !== word[0].toUpperCase()) {
        errors.push(word);
        return;
      }
    }
    
    // Check for numbers mixed with letters incorrectly
    if (/\d/.test(word) && /[a-zA-Z]/.test(word) && !/^\d+[a-zA-Z]+$|^[a-zA-Z]+\d+$/.test(word)) {
      errors.push(word);
      return;
    }
  });
  
  return {
    count: errors.length,
    errors: [...new Set(errors)], // Remove duplicates
  };
};
