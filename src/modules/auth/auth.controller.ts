import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new account in the Fincheck' })
  @ApiBody({ type: SignupDto })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Login in the Fincheck account' })
  @ApiBody({ type: SigninDto })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
