# -*- coding: utf-8 -*-
##############################################################################
#
#    Patch - Completion input options
#
#    Author(s): Enrico Ganzaroli (enrico.gz@gmail.com)
#    Copyright © 2018 Enrico Ganzaroli (enrico.gz@gmail.com)
#
#    License AGPL-3.0 or later (https://www.gnu.org/licenses/lgpl).
#
##############################################################################
{
    'name': 'Patch - Completion input options',
    'version': '7.0.1.0.0',
    'category': 'Patch',
    'summary': 'Adds some options support to completion inputs',
    'author': 'Enrico Ganzaroli',
    'description': """
Adds support for the following options to completion inputs FieldMany2One, FieldMany2ManyTags and FieldMany2ManyKanban:

    - **search_more** *(true|false)*: enable/disable "Search More..." menu item (default: true)
    - **create** *(true|false)*: enable/disable "Create and Edit..." menu item (default: true)
    - **quick_create** *(true|false)*: enable/disable quick creation of a new record if no match found (default: false)
    - **limit** *(integer)*: sets maximum number of results in drop down menu (default 7)

e.g.

    <field name="partner_id" options='{"search_more": true, "create": false, "quick_create": false, "limit": 12}'/>
    """,

    'website': 'https://github.com/efatto/patch.git',
    'license': 'AGPL-3',
    'depends': [
    ],
    'data': [
    ],
    'js': [
        'static/src/js/main.js',
    ],
    'installable': True
}
