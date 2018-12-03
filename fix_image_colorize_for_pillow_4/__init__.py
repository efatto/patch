# -*- coding: utf-8 -*-
##############################################################################
#
#    Patch - image_colorize fix for pillow 4
#    See __openerp__.py file for copyright and licensing details.
#
##############################################################################

import io
import StringIO
from PIL import Image
from random import random
import openerp.tools as tools

def patched_colorized(original, randomize=True, color=(255, 255, 255)):
    """ Add a color to the transparent background of an image.
        :param original: file object on the original image file
        :param randomize: randomize the background color
        :param color: background-color, if not randomize
    """
    # create a new image, based on the original one
    original = Image.open(io.BytesIO(original))
    image = Image.new('RGB', original.size)
    # generate the background color, past it as background
    if randomize:
        color = (int(random() * 192 + 32), int(random() * 192 + 32), int(random() * 192 + 32))
    image.paste(color, (0, 0, original.size[0], original.size[1]))
    image.paste(original, mask=original)
    # return the new image
    buffer = StringIO.StringIO()
    image.save(buffer, 'PNG')
    return buffer.getvalue()

tools.image_colorize = patched_colorized