# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


with open('README.md') as f:
    readme = f.read()

with open('../LICENSE') as f:
    license = f.read()

setup(
    name='pivot-serverless services',
    version='1.0.0',
    description='Services for conducting Ranked Pairs Elections',
    long_description=readme,
    author='Carl Schroedl',
    author_email='carlschroedl@gmail.com',
    url='https://github.com/pivot-libre/pivot-serverless',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)
