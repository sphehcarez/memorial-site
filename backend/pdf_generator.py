from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import io
import requests
from datetime import datetime
from typing import List, Dict, Any
import os
from PIL import Image as PILImage

class MemoryGalleryPDFGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        """Setup custom styles for the PDF"""
        # Title style
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#166534')
        )
        
        # Subtitle style
        self.subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=self.styles['Heading2'],
            fontSize=16,
            spaceAfter=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#374151')
        )
        
        # Memory title style
        self.memory_title_style = ParagraphStyle(
            'MemoryTitle',
            parent=self.styles['Heading3'],
            fontSize=14,
            spaceBefore=20,
            spaceAfter=10,
            textColor=colors.HexColor('#166534')
        )
        
        # Description style
        self.description_style = ParagraphStyle(
            'Description',
            parent=self.styles['Normal'],
            fontSize=11,
            spaceAfter=15,
            alignment=TA_JUSTIFY,
            textColor=colors.HexColor('#4B5563')
        )
        
        # Metadata style
        self.metadata_style = ParagraphStyle(
            'Metadata',
            parent=self.styles['Normal'],
            fontSize=9,
            spaceAfter=10,
            textColor=colors.HexColor('#6B7280')
        )

    def create_header_footer(self, canvas, doc):
        """Create header and footer for each page"""
        canvas.saveState()
        
        # Header
        canvas.setFont('Helvetica-Bold', 12)
        canvas.setFillColor(colors.HexColor('#166534'))
        canvas.drawString(50, letter[1] - 50, "Dr. Edgar Chagwa Lungu Memorial Gallery")
        
        # Footer
        canvas.setFont('Helvetica', 9)
        canvas.setFillColor(colors.HexColor('#6B7280'))
        canvas.drawString(50, 30, f"Generated on {datetime.now().strftime('%B %d, %Y')}")
        canvas.drawRightString(letter[0] - 50, 30, f"Page {doc.page}")
        
        canvas.restoreState()

    def download_image(self, url: str) -> io.BytesIO:
        """Download image from URL and return as BytesIO"""
        try:
            if url.startswith('/placeholder.svg'):
                # Create a placeholder image
                img = PILImage.new('RGB', (400, 300), color='lightgray')
                img_buffer = io.BytesIO()
                img.save(img_buffer, format='JPEG')
                img_buffer.seek(0)
                return img_buffer
            
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return io.BytesIO(response.content)
        except Exception as e:
            print(f"Error downloading image {url}: {e}")
            # Return placeholder
            img = PILImage.new('RGB', (400, 300), color='lightgray')
            img_buffer = io.BytesIO()
            img.save(img_buffer, format='JPEG')
            img_buffer.seek(0)
            return img_buffer

    def generate_pdf(self, items: List[Dict[str, Any]], category: str = "all") -> io.BytesIO:
        """Generate PDF from gallery items"""
        buffer = io.BytesIO()
        
        # Create document
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=50,
            leftMargin=50,
            topMargin=80,
            bottomMargin=80
        )
        
        # Story (content) list
        story = []
        
        # Title page
        story.append(Paragraph("Dr. Edgar Chagwa Lungu", self.title_style))
        story.append(Paragraph("Memorial Gallery", self.subtitle_style))
        story.append(Spacer(1, 20))
        
        category_name = category.replace('-', ' ').title() if category != "all" else "Complete Collection"
        story.append(Paragraph(f"Category: {category_name}", self.subtitle_style))
        story.append(Paragraph(f"Total Memories: {len(items)}", self.metadata_style))
        story.append(Paragraph(f"Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", self.metadata_style))
        
        story.append(Spacer(1, 30))
        story.append(Paragraph(
            "This collection preserves the visual memories and moments from the life and presidency of "
            "Dr. Edgar Chagwa Lungu, sixth President of the Republic of Zambia. Each image tells a story "
            "of leadership, service, and dedication to the Zambian people.",
            self.description_style
        ))
        
        story.append(PageBreak())
        
        # Add each memory
        for i, item in enumerate(items):
            # Memory title
            story.append(Paragraph(f"{i+1}. {item['title']}", self.memory_title_style))
            
            # Try to add image
            try:
                img_buffer = self.download_image(item['url'])
                img = Image(img_buffer, width=4*inch, height=3*inch)
                story.append(img)
                story.append(Spacer(1, 10))
            except Exception as e:
                print(f"Could not add image for {item['title']}: {e}")
                story.append(Paragraph("[Image not available]", self.metadata_style))
                story.append(Spacer(1, 10))
            
            # Description
            story.append(Paragraph(item['description'], self.description_style))
            
            # Metadata
            metadata_text = f"Year: {item['year']}"
            if 'location' in item and item['location']:
                metadata_text += f" | Location: {item['location']}"
            if 'photographer' in item and item['photographer']:
                metadata_text += f" | Photo by: {item['photographer']}"
            
            story.append(Paragraph(metadata_text, self.metadata_style))
            
            # Tags
            if 'tags' in item and item['tags']:
                tags_text = "Tags: " + ", ".join(item['tags'])
                story.append(Paragraph(tags_text, self.metadata_style))
            
            # Add space between memories
            if i < len(items) - 1:
                story.append(Spacer(1, 30))
                # Add page break every 2-3 items to avoid crowding
                if (i + 1) % 2 == 0:
                    story.append(PageBreak())
        
        # Build PDF
        doc.build(story, onFirstPage=self.create_header_footer, onLaterPages=self.create_header_footer)
        
        buffer.seek(0)
        return buffer

# Initialize the PDF generator
pdf_generator = MemoryGalleryPDFGenerator()
