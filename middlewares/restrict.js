const jwt = require('jsonwebtoken');
const AuthValidation = require('../validations/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { JWT_SECRET } = process.env;