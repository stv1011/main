# main
This is my main repository for research project.

# Korean-Japanese Contrastive Research Pipeline Tool

## Introduction
This project is an open-source workflow and text-mining toolkit designed to streamline data collection, morphological alignment, and cross-linguistic analysis for Korean-Japanese contrastive research.

## Key Features
- **Bilingual Morphological Parsing & Alignment**: Integrates Python-based NLP engines (Sudachi/MeCab for Japanese, Kiwi/MeCab for Korean) to handle sentence-level mapping and encoding normalization.
- **N-gram & Pragmatic Feature Extraction**: Extracts linguistic features, collocations, and target grammatical patterns (e.g., benefactives, honorifics, pragmatic markers) across comparative corpora.
- **Corpus & Metadata Management**: Manages structured text metadata across diverse domain sources (parliamentary records, literary texts, media transcripts) with export options for statistical analysis.
- **Automated Visualization & Statistical Reporting**: Generates frequency distribution tables and comparative charts for academic evaluation and research reporting.

## Usage
1. **Download**: Clone the repository and install dependencies.
   ```bash
   git clone [https://github.com/username/kj-contrastive-research-tool.git](https://github.com/username/kj-contrastive-research-tool.git)
   cd kj-contrastive-research-tool
   pip install -r requirements.txt

Execution: Run the main processing pipeline with your target configuration.

Bash
python main.py --config config.json

License
MIT License
