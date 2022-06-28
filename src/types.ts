import { TrunicConsonant, ValidConsonantPhonemes } from "./phonemes/consonants";
import { TrunicVowel, ValidVowelPhonemes } from "./phonemes/vowels";

export type Point = [number, number];

export type Phoneme<T> = 
  T extends ValidConsonantPhonemes ? ValidConsonantPhonemes : 
  T extends ValidVowelPhonemes ? ValidVowelPhonemes : 
  never; 